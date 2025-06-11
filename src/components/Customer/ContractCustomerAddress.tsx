import React from 'react'
import { updateCustomer } from '@/sites/retail/features/quoteSlice'
import FormInput from './FormInput'

interface ContractCustomerAddressProps {
   customer: any
   provinceList: string[]
   comuniList: any[]
   readOnly: boolean
   dispatch: any
   t: (key: string) => string
}

const SelectField = ({
   required,
   value,
   onChange,
   disabled,
   options,
   placeholder,
}: {
   required?: boolean
   value: string
   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
   disabled?: boolean
   options: { value: string; label: string }[]
   placeholder: string
}) => (
   <select
      required={required}
      className="border border-gray-300 rounded px-3 py-2 w-full"
      value={value}
      onChange={onChange}
      disabled={disabled}
   >
      <option value="" disabled>
         {placeholder}
      </option>
      {options.map(opt => (
         <option key={opt.value} value={opt.value}>
            {opt.label}
         </option>
      ))}
   </select>
)

const ContractCustomerAddress = ({
   customer,
   provinceList,
   comuniList,
   readOnly,
   dispatch,
   t,
}: ContractCustomerAddressProps) => (
   <div>
      <label className="text-left block font-bold mb-1 mt-2">{t('Indirizzo')} *</label>
      <div className="flex flex-col md:flex-row gap-4 mb-2">
         {readOnly ? (
            <>
               <FormInput required placeholder="Provincia" value={customer?.customAddress_province ?? ''} readOnly />
               <FormInput required placeholder="Comune" value={customer?.customAddress_city ?? ''} readOnly />
            </>
         ) : (
            <>
               <SelectField
                  required
                  value={customer?.customAddress_province ?? ''}
                  onChange={e =>
                     !readOnly &&
                     dispatch(updateCustomer({ customAddress_province: e.target.value, customAddress_city: '' }))
                  }
                  disabled={readOnly}
                  options={provinceList.map(provincia => ({ value: provincia, label: provincia }))}
                  placeholder="Provincia"
               />
               <SelectField
                  required
                  value={customer?.customAddress_city ?? ''}
                  onChange={e => !readOnly && dispatch(updateCustomer({ customAddress_city: e.target.value }))}
                  disabled={!customer?.customAddress_province || readOnly}
                  options={comuniList.map(comune => ({ value: comune.nome, label: comune.nome }))}
                  placeholder="Comune"
               />
            </>
         )}
         <FormInput required placeholder="CAP" mapField="customAddress_zipCode" readOnly={readOnly} />
      </div>
      <FormInput
         required
         placeholder="Indirizzo e numero civico"
         mapField="customAddress_address"
         readOnly={readOnly}
      />
   </div>
)

export default ContractCustomerAddress
