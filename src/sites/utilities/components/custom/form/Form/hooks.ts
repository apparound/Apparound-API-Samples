import React from 'react'
import { formatDateToDisplay } from './dateUtils'

/**
 * Hook personalizzato per la gestione degli input di tipo data
 */
export const useDateInput = (isDate: boolean, value?: string) => {
   const [actualInputType, setActualInputType] = React.useState(isDate ? 'text' : undefined)
   const [displayValue, setDisplayValue] = React.useState(isDate ? formatDateToDisplay(value || '') : value || '')

   // Aggiorna il valore di display quando il valore prop cambia
   React.useEffect(() => {
      if (isDate) {
         setDisplayValue(formatDateToDisplay(value || ''))
      } else {
         setDisplayValue(value || '')
      }
   }, [value, isDate])

   return {
      actualInputType,
      setActualInputType,
      displayValue,
      setDisplayValue,
   }
}
