import { useTranslation } from 'react-i18next'

// Utility function per unire le classi (alternativa a clsx)
const cn = (...classes: (string | undefined | null | false)[]): string => {
   return classes.filter(Boolean).join(' ')
}

interface TextProps {
   name: string
   label: string
   inputType?: string
   required?: boolean
   value?: string
   min?: string
   className?: string
   onChange:
      | ((value: string | number | boolean, name: string) => any)
      | ((e: React.ChangeEvent<HTMLInputElement>) => void)
   onFocus?: (event: React.FocusEvent<HTMLInputElement>, name: string) => void
   onBlur?: (event: React.FocusEvent<HTMLInputElement>, name: string) => void
}

const Text = ({ name, label, inputType, required, onChange, value, min, onFocus, onBlur, className }: TextProps) => {
   const { t } = useTranslation()

   const baseClasses = `block bg-white px-3 py-1.5 pt-4 w-full min-w-[250px] rounded-md outline outline-1 -outline-offset-1 outline-primary placeholder:text-gray-900 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 peer invalid:outline-red-300`

   const combinedClasses = cn(baseClasses, !className?.includes('text-') && 'text-gray-900', className)

   return (
      <div className="relative">
         <input
            type={inputType || 'text'}
            name={name}
            id={name}
            className={combinedClasses}
            placeholder=" "
            onChange={e => {
               if (typeof onChange === 'function' && onChange.length === 2) {
                  ;(onChange as (value: string | number | boolean, name: string) => any)(e.target.value, name)
               } else {
                  ;(onChange as (e: React.ChangeEvent<HTMLInputElement>) => void)(e)
               }
            }}
            onFocus={onFocus ? e => onFocus(e, name) : undefined}
            onBlur={onBlur ? e => onBlur(e, name) : undefined}
            required={required}
            value={value || ''}
            min={min}
         />
         <label
            htmlFor={name}
            className="absolute text-gray-400 text-lg dark:text-gray-400 duration-300 transform -translate-y-5.5 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
         >
            {t(label)}
            {required ? '*' : ''}
         </label>
      </div>
   )
}

export default Text
