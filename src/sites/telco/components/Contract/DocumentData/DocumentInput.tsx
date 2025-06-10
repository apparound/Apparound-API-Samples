import React from 'react'
import Text from '@/sites/utilities/components/custom/form/Form/Text'

interface DocumentInputProps {
   id: string
   type?: string
   placeholder?: string
   value?: string
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
   min?: string
}

const DocumentInput: React.FC<DocumentInputProps> = ({ id, type = 'text', placeholder, value, onChange, min }) => {
   const isDate = type === 'date'
   const [inputType, setInputType] = React.useState(isDate ? 'text' : type)

   React.useEffect(() => {
      if (!isDate) setInputType(type)
   }, [type, isDate])

   if (isDate) {
      return (
         <Text
            label={placeholder}
            name={id}
            inputType={inputType}
            value={value}
            onChange={onChange}
            min={min}
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
            className="flex"
         />
      )
   }
   return (
      <Text label={placeholder} name={id} inputType={type} className="flex w-full" value={value} onChange={onChange} />
   )
}

export default DocumentInput
