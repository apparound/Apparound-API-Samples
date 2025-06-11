import React from 'react'
import { selectCustomer } from '@/sites/retail/features/quoteSlice'
import SectionTitle from '@/sites/telco/components/SectionTitle'
import { useSelector, useDispatch } from 'react-redux'
import { getProvince, getComuniByProvincia } from '@/utils/comuniUtils'
import { useTranslation } from 'react-i18next'
import FormInput from './FormInput'
import ContractCustomerAddress from './ContractCustomerAddress'

interface ContractCustomerFormProps {
   className?: string
   readOnly?: boolean
}

const ContractCustomerForm = ({ className = '', readOnly = false }: ContractCustomerFormProps) => {
   const dispatch = useDispatch()
   const customer = useSelector(selectCustomer)
   const provinceList = React.useMemo(() => getProvince(), [])
   const comuniList = React.useMemo(
      () => getComuniByProvincia(customer?.customAddress_province ?? ''),
      [customer?.customAddress_province]
   )
   const { t } = useTranslation()

   return (
      <>
         <SectionTitle text="Dati personali" />
         <form className={`space-y-4 ${className}`}>
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

export default ContractCustomerForm
