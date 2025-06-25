import React, { useImperativeHandle, useRef } from 'react'
import { selectCustomer } from '@/sites/retail/features/quoteSlice'
import SectionTitle from '@/sites/telco/components/SectionTitle'
import { useSelector, useDispatch } from 'react-redux'
import { getProvince, getComuniByProvincia } from '@/utils/comuniUtils'
import { useTranslation } from 'react-i18next'
import FormInput from './FormInput'
import ContractCustomerAddress from './ContractCustomerAddress'
import { setRedOutline } from '@/lib/setRedOutline'

interface ContractCustomerFormProps {
   className?: string
   readOnly?: boolean
}

const ContractCustomerForm = React.forwardRef(
   ({ className = '', readOnly = false }: ContractCustomerFormProps, ref) => {
      const dispatch = useDispatch()
      const customer = useSelector(selectCustomer)
      const provinceList = React.useMemo(() => getProvince(), [])
      const comuniList = React.useMemo(
         () => getComuniByProvincia(customer?.customAddress_province ?? ''),
         [customer?.customAddress_province]
      )
      const { t } = useTranslation()
      const formRef = useRef<HTMLFormElement>(null)

      // Validazione campi obbligatori
      const validate = () => {
         let valid = true
         if (formRef.current) {
            const elements = Array.from(formRef.current.elements) as HTMLInputElement[]
            elements.forEach(el => {
               if (el.required && !el.value) {
                  setRedOutline(el, true)
                  valid = false
               } else {
                  setRedOutline(el, false)
               }
            })
         }
         return valid
      }

      useImperativeHandle(ref, () => ({ validate }))

      return (
         <>
            <SectionTitle text="Dati personali" />
            <form className={`space-y-4 ${className}`} ref={formRef}>
               <div className="flex flex-col md:flex-row gap-4">
                  <FormInput required placeholder="Nome" mapField="firstName" readOnly={readOnly} />
                  <FormInput required placeholder="Cognome" mapField="lastName" readOnly={readOnly} />
               </div>
               <div className="flex flex-col md:flex-row gap-4">
                  <FormInput required placeholder="Email" mapField="email" readOnly={readOnly} />
                  <FormInput required placeholder="Telefono" mapField="phoneNumber" readOnly={readOnly} />
               </div>
               <ContractCustomerAddress
                  customer={customer}
                  provinceList={provinceList}
                  comuniList={comuniList}
                  readOnly={readOnly}
                  dispatch={dispatch}
                  t={t}
               />
               {!readOnly && (
                  <div className="flex items-center mt-2">
                     <input type="checkbox" id="indirizzoUguale" className="accent-primary w-4 h-4" />
                     <label htmlFor="indirizzoUguale" className="ml-2 text-sm">
                        {t("L'indirizzo di residenza è uguale a quello di fatturazione")}
                     </label>
                  </div>
               )}
            </form>
         </>
      )
   }
)

export default ContractCustomerForm
