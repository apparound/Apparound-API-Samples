import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, updateCustomer } from '@/sites/retail/features/quoteSlice'
import Text from '@/sites/utilities/components/custom/form/Form/Text'

interface FormInputProps {
   required?: boolean
   placeholder: string
   type?: string
   className?: string
   labelClassName?: string
   mapField?: string
   [key: string]: any
}

const FormInput = ({
   required = false,
   placeholder,
   type = 'text',
   className = '!outline-[#CCCCCC] w-full',
   labelClassName = 'outline-[#FF0000]',
   mapField,
   readOnly = false,
   min,
   ...props
}: FormInputProps & { readOnly?: boolean }) => {
   const dispatch = useDispatch()
   const customer = useSelector(selectCustomer)
   const value = mapField ? customer?.[mapField] ?? '' : undefined
   const handleChange = (val: string | number | boolean, name: string) => {
      if (readOnly) return
      if (mapField) {
         dispatch(updateCustomer({ [mapField]: val }))
      }
      if (props.onChange) props.onChange(val, name)
   }
   return (
      <Text
         required={required}
         label={placeholder}
         inputType={type}
         className={className}
         labelClassName={labelClassName}
         name={mapField || ''}
         value={value}
         min={min}
         onChange={handleChange}
         readonly={readOnly}
      />
   )
}

export default FormInput
