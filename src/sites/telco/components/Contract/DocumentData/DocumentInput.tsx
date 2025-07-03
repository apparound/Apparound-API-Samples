import React from 'react'
import Text from '@/sites/utilities/components/custom/form/Form/Text'

interface DocumentInputProps {
   id: string
   type?: string
   placeholder?: string
   value?: string
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
   min?: string
   readonly?: boolean
}

const DocumentInput: React.FC<DocumentInputProps> = ({
   id,
   type = 'text',
   placeholder,
   value,
   onChange,
   min,
   readonly = false,
}) => {
   const inputClassName = '!outline-[#CCCCCC]'
   const labelClassName = ''

   return (
      <Text
         label={placeholder || ''}
         name={id}
         inputType={type}
         value={value}
         onChange={onChange}
         min={min}
         className={inputClassName}
         labelClassName={labelClassName}
         readonly={readonly}
      />
   )
}

export default DocumentInput
