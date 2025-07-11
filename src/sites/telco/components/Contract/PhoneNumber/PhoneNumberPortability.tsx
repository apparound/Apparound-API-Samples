import { selectFlatCartWithQuantities, selectQuote, selectTree } from '@/sites/retail/features/quoteSlice'
import SectionTitle from '../../SectionTitle'
import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { useSelector } from 'react-redux'
import { findNodeForKey } from '@/hooks/useQuote'
import { useTranslation } from 'react-i18next'
import OperatorSelect from './OperatorSelect'
import NumberLines from './NumberLines'
import PortabilityOption from './PortabilityOption'
import { ApparoundData } from '@/sites/utilities/hooks/use-apparound-data'
import { setRedOutline } from '@/lib/setRedOutline'

const PhoneNumberPortability: React.FC<any> = forwardRef((props, ref) => {
   const { t } = useTranslation()
   const flatCart = useSelector(selectFlatCartWithQuantities)
   const tree = useSelector(selectTree)
   let treeProducts = flatCart.map(item => findNodeForKey('guid', item.guid, tree)).filter(node => node)
   const quote = useSelector(selectQuote)

   const hasPortability = treeProducts.some((node: any) => node.config && node.config.isPortability == '1')
   const setQuantityProduct = treeProducts.find((node: any) => node.config && node.config.isQuantity == '1')
   const setQuantity = setQuantityProduct
      ? flatCart.find(item => item.guid === setQuantityProduct.guid)?.quantity || 0
      : 0

   const [selected, setSelected] = useState('new')
   const [operator, setOperator] = useState('')
   const [phoneNumbers, setPhoneNumbers] = useState<string[]>([])
   const [phoneIds, setPhoneIds] = useState<string[]>([])

   // Variabile ref per mantenere il json aggiornato
   const phoneConfigRef = useRef<{ phoneNumbers: string[]; phoneIds: string[] }>({ phoneNumbers: [], phoneIds: [] })

   React.useEffect(() => {
      if (selected === 'portability' && setQuantity > 0) {
         setPhoneNumbers(Array(setQuantity).fill(''))
         setPhoneIds(Array(setQuantity).fill(''))
         phoneConfigRef.current = { phoneNumbers: Array(setQuantity).fill(''), phoneIds: Array(setQuantity).fill('') }
      }
   }, [selected, setQuantity])

   const handleArrayChange = (
      setter: React.Dispatch<React.SetStateAction<string[]>>,
      index: number,
      value: string,
      type: 'phoneNumbers' | 'phoneIds'
   ) => {
      setter(prev => {
         const updated = [...prev]
         updated[index] = value
         phoneConfigRef.current = {
            ...phoneConfigRef.current,
            [type]: updated,
         }
         return updated
      })
   }

   const handlePhoneNumberChange = (index: number, value: string) => {
      handleArrayChange(setPhoneNumbers, index, value, 'phoneNumbers')
   }

   const handlePhoneIdChange = (index: number, value: string) => {
      handleArrayChange(setPhoneIds, index, value, 'phoneIds')
   }

   const handleInputBlur = async () => {
      const productGuid = setQuantityProduct?.guid || ''
      const apparoundData = new ApparoundData()

      const data = (phoneConfigRef.current.phoneNumbers || []).map((phoneNumber, idx) => ({
         phoneNumber,
         phoneId: phoneConfigRef.current.phoneIds[idx] || '',
      }))

      const allFilled = data.every(item => item.phoneNumber && item.phoneId)
      if (!allFilled) return
      try {
         await apparoundData.fetchData(`/setProductConfiguration/productGuid/${productGuid}`, 'post', {
            configuration: data,
         })
      } catch (e) {}
   }

   // Validazione campi obbligatori
   const validate = () => {
      let valid = true
      if (selected === 'portability' && setQuantity > 0) {
         phoneNumbers.forEach((num, idx) => {
            const input = document.querySelector(`input[name='phoneNumber-${idx}']`) as HTMLInputElement
            if (input) setRedOutline(input, !num)
            if (!num) {
               valid = false
            }
            const idInput = document.querySelector(`input[name='phoneId-${idx}']`) as HTMLInputElement
            if (idInput) setRedOutline(idInput, !phoneIds[idx])
            if (!phoneIds[idx]) {
               valid = false
            }
         })
      }
      return valid
   }
   useImperativeHandle(ref, () => ({ validate }))

   return (
      <div className="w-full">
         {hasPortability && (
            <>
               <SectionTitle text="Portabilità numero" />
               <div className="mt-4 flex flex-col gap-4">
                  <div className="flex gap-6">
                     <PortabilityOption
                        value="new"
                        label={t('Nuovo numero')}
                        checked={selected === 'new'}
                        onChange={setSelected}
                     />
                     <PortabilityOption
                        value="portability"
                        label={t('Portabilità numero esistente')}
                        checked={selected === 'portability'}
                        onChange={setSelected}
                     />
                  </div>
                  {selected === 'portability' && (
                     <>
                        <OperatorSelect value={operator} onChange={setOperator} label={t('Operatore di provenienza')} />
                        {setQuantity > 0 && (
                           <NumberLines
                              quantity={setQuantity}
                              phoneNumbers={phoneNumbers}
                              phoneIds={phoneIds}
                              onPhoneNumberChange={handlePhoneNumberChange}
                              onPhoneIdChange={handlePhoneIdChange}
                              onInputBlur={handleInputBlur}
                           />
                        )}
                     </>
                  )}
               </div>
            </>
         )}
      </div>
   )
})

export default PhoneNumberPortability
