import SectionTitle from '@/sites/telco/components/SectionTitle'

interface ContractCustomerFormProps {
   className?: string
}

interface FormInputProps {
   required?: boolean
   placeholder: string
   type?: string
   className?: string
   [key: string]: any
}

const FormInput = ({ required = false, placeholder, type = 'text', className = '', ...props }: FormInputProps) => (
   <input
      required={required}
      placeholder={placeholder}
      type={type}
      className={`border border-gray-300 rounded px-3 py-2 w-full ${className}`}
      {...props}
   />
)

const ContractCustomerForm = ({ className = '' }: ContractCustomerFormProps) => {
   return (
      <>
         <SectionTitle text="Dati personali" />
         <form className={`space-y-4 ${className}`}>
            <div className="flex flex-col md:flex-row gap-4">
               <FormInput required placeholder="Nome *" />
               <FormInput required placeholder="Cognome *" />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
               <FormInput required placeholder="Email *" />
               <FormInput required placeholder="Telefono *" />
            </div>
            <div>
               <label className="text-left block font-bold mb-1 mt-2">Indirizzo *</label>
               <div className="flex flex-col md:flex-row gap-4 mb-2">
                  <select required className="border border-gray-300 rounded px-3 py-2 w-full">
                     <option value="" disabled selected>
                        Provincia
                     </option>
                     {/* Opzioni province */}
                  </select>
                  <select required className="border border-gray-300 rounded px-3 py-2 w-full">
                     <option value="" disabled selected>
                        Comune
                     </option>
                     {/* Opzioni comuni */}
                  </select>
                  <FormInput required placeholder="CAP" />
               </div>
               <FormInput required placeholder="Indirizzo e numero civico" />
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
