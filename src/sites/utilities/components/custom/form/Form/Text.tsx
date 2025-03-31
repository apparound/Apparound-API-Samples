import React from 'react'
import { useTranslation } from 'react-i18next'

interface TextProps {
   name: string
   label: string
   inputType?: string
   required?: boolean
   value?: string
   onChange: (value: string | number | boolean, name: string) => any
}

const Text = ({ name, label, inputType, required, onChange, value }: TextProps) => {
   const { t } = useTranslation()
   return (
      <div className="relative">
         <input
            type={inputType || 'text'}
            name={name}
            id={name}
            className="block bg-white px-3 py-1.5 pt-4 w-full text-base text-gray-900 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 peer :invalid:outline-red-300"
            placeholder=" "
            onChange={e => onChange(e.target.value, name)}
            required={required}
            value={value || ''}
         />
         <label
            htmlFor={name}
            className="absolute text-lg text-black dark:text-gray-400 duration-300 transform -translate-y-5.5 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
         >
            {t(label)} {required ? '*' : ''}
         </label>
      </div>
   )
}

export default Text
