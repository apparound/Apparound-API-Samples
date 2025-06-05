import { selectCustomer } from '@/sites/retail/features/quoteSlice'
import SectionTitle from '@/sites/telco/components/SectionTitle'
import { useSelector } from 'react-redux'

interface ContractCustomerFormProps {
   className?: string
}

interface FormInputProps {
   required?: boolean
   placeholder: string
   type?: string
   className?: string
   mapField?: string // aggiunta la nuova proprietà
   [key: string]: any
}

const FormInput = ({
   required = false,
   placeholder,
   type = 'text',
   className = '',
   mapField,
   ...props
}: FormInputProps) => {
   const customer = useSelector(selectCustomer)
   const value = mapField ? customer?.[mapField] ?? '' : undefined
   return (
      <input
         required={required}
         placeholder={placeholder}
         type={type}
         className={`border border-gray-300 rounded px-3 py-2 w-full ${className}`}
         value={value}
         {...props}
      />
   )
}

const ContractCustomerForm = ({ className = '' }: ContractCustomerFormProps) => {
   const customer = useSelector(selectCustomer)
   return (
      <>
         <SectionTitle text="Dati personali" />
         <form className={`space-y-4 ${className}`}>
            <div className="flex flex-col md:flex-row gap-4">
               <FormInput required placeholder="Nome *" mapField="firstName" />
               <FormInput required placeholder="Cognome *" mapField="lastName" />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
               <FormInput required placeholder="Email *" mapField="email" />
               <FormInput required placeholder="Telefono *" mapField="phoneNumber" />
            </div>
            <div>
               <label className="text-left block font-bold mb-1 mt-2">Indirizzo *</label>
               <div className="flex flex-col md:flex-row gap-4 mb-2">
                  <select required className="border border-gray-300 rounded px-3 py-2 w-full" value={customer?.customAddress_province ?? ''}>
                     <option value="" disabled selected>
                        Provincia
                     </option>
                     {/* Opzioni province */}
                  </select>
                  <select required className="border border-gray-300 rounded px-3 py-2 w-full" value={customer?.customAddress_city ?? ''}>
                     <option value="" disabled selected>
                        Comune
                     </option>
                     {/* Opzioni comuni */}
                  </select>
                  <FormInput required placeholder="CAP" mapField="customAddress_zipCode" />
               </div>
               <FormInput required placeholder="Indirizzo e numero civico" mapField="customAddress_address" />
            </div>
            <div className="flex items-center mt-2">
               <input type="checkbox" id="indirizzoUguale" className="accent-primary w-4 h-4" />
               <label htmlFor="indirizzoUguale" className="ml-2 text-sm">
                  L'indirizzo di residenza è uguale a quello di fatturazione
               </label>
            </div>
         </form>
      </>
   )
}

export default ContractCustomerForm
