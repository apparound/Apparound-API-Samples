import { selectFlatCartWithQuantities, selectQuote, selectTree } from '@/sites/retail/features/quoteSlice'
import SectionTitle from '../../SectionTitle'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { findNodeForKey } from '@/hooks/useQuote'
import { useTranslation } from 'react-i18next'
import OperatorSelect from './OperatorSelect'
import NumberLines from './NumberLines'
import PortabilityOption from './PortabilityOption'

const PhoneNumberPortability: React.FC = () => {
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

   React.useEffect(() => {
      if (selected === 'portability' && setQuantity > 0) {
         setPhoneNumbers(Array(setQuantity).fill(''))
         setPhoneIds(Array(setQuantity).fill(''))
      }
   }, [selected, setQuantity])

   const handleArrayChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
      setter(prev => {
         const updated = [...prev]
         updated[index] = value
         return updated
      })
   }

   const handlePhoneNumberChange = (index: number, value: string) => {
      handleArrayChange(setPhoneNumbers, index, value)
   }

   const handlePhoneIdChange = (index: number, value: string) => {
      handleArrayChange(setPhoneIds, index, value)
   }

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
                           />
                        )}
                     </>
                  )}
               </div>
            </>
         )}
      </div>
   )
}

export default PhoneNumberPortability
