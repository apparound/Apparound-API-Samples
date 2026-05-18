import { cn } from './utils'

/**
 * Genera le classi CSS per l'input
 */
export const getInputClasses = (showError: boolean, readonly: boolean, className?: string): string => {
   const baseClasses =
      'bg-white px-3 py-1.5 pt-4 w-full rounded-md placeholder:text-gray-900 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 peer'
   const errorClass = showError ? 'outline-red-300 outline-2 outline' : ''
   const borderClasses = readonly
      ? 'border-0 outline-0'
      : showError
      ? ''
      : 'outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-primary'

   return cn('block', borderClasses, baseClasses, errorClass, className)
}

/**
 * Genera le classi CSS per la label
 */
export const getLabelClasses = (labelClassName?: string): string => {
   const baseClasses =
      'absolute text-gray-400 text-lg dark:text-gray-400 duration-300 transform -translate-y-5.5 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
   return cn(baseClasses, labelClassName)
}
