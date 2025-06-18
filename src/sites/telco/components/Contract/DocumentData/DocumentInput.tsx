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
   const isDate = type === 'date'
   const [inputType, setInputType] = React.useState(isDate ? 'text' : type)

   const inputClassName = 'outline outline-1 outline-[#CCCCCC]'
   const labelClassName = 'text-sm'

   const commonTextProps = {
      label: placeholder,
      name: id,
      value,
      onChange,
      min,
      className: inputClassName,
      labelClassName,
      readonly,
   }

   React.useEffect(() => {
      if (!isDate) setInputType(type)
   }, [type, isDate])

   if (isDate) {
      return (
         <Text
            {...commonTextProps}
            inputType={inputType}
            onFocus={e => {
               setInputType('date')
               setTimeout(() => {
                  if (e.target.showPicker) {
                     e.target.showPicker()
                  }
               }, 0)
            }}
            onBlur={e => {
               if (!e.target.value) setInputType('text')
            }}
         />
      )
   }
   return <Text {...commonTextProps} inputType={type} />
}

export default DocumentInput
