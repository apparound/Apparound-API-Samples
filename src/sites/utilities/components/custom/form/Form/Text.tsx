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
   labelClassName?: string
   onChange:
      | ((value: string | number | boolean, name: string) => any)
      | ((e: React.ChangeEvent<HTMLInputElement>) => void)
   onFocus?: (event: React.FocusEvent<HTMLInputElement>, name: string) => void
   onBlur?: (event: React.FocusEvent<HTMLInputElement>, name: string) => void
   readonly?: boolean
   formSubmitted?: boolean
}

const Text = ({
   name,
   label,
   inputType,
   required,
   onChange,
   value,
   min,
   onFocus,
   onBlur,
   className,
   labelClassName,
   readonly = false,
   formSubmitted = false,
}: TextProps) => {
   const { t } = useTranslation()

   const showError = required && formSubmitted && (!value || value === '')
   const baseClasses = `bg-white px-3 py-1.5 pt-4 w-full rounded-md placeholder:text-gray-900 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 peer`
   const errorClass = showError ? 'outline-red-300 outline-2 outline' : ''
   const borderOutlineClasses = readonly
      ? 'border-0 outline-0'
      : showError
      ? ''
      : 'outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-primary'
   const combinedClasses = cn('block', borderOutlineClasses, baseClasses, errorClass, className)

   const labelBaseClasses =
      'absolute text-gray-400 text-lg dark:text-gray-400 duration-300 transform -translate-y-5.5 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
   const combinedLabelClasses = cn(labelBaseClasses, labelClassName)

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
            disabled={readonly}
         />
         <label htmlFor={name} className={combinedLabelClasses}>
            {t(label)}
            {required ? '*' : ''}
         </label>
      </div>
   )
}

export default Text
