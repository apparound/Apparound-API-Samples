import { DATE_DISPLAY_REGEX, DATE_ISO_REGEX } from './constants'

/**
 * Converte una data dal formato ISO (yyyy-MM-dd) al formato display (dd-MM-yyyy)
 */
export const formatDateToDisplay = (dateValue: string): string => {
   if (!dateValue) return ''

   // Se già in formato display, restituisce così com'è
   if (DATE_DISPLAY_REGEX.test(dateValue)) {
      return dateValue
   }

   // Converte da formato ISO a formato display
   if (DATE_ISO_REGEX.test(dateValue)) {
      const [year, month, day] = dateValue.split('-')
      return `${day}-${month}-${year}`
   }

   return dateValue
}

/**
 * Converte una data dal formato display (dd-MM-yyyy) al formato ISO (yyyy-MM-dd)
 */
export const formatDateToISO = (displayValue: string): string => {
   if (!displayValue) return ''

   // Converte da formato display a formato ISO
   if (DATE_DISPLAY_REGEX.test(displayValue)) {
      const [day, month, year] = displayValue.split('-')
      return `${year}-${month}-${day}`
   }

   return displayValue
}

/**
 * Formatta l'input manuale della data aggiungendo i trattini automaticamente
 */
export const formatDateInput = (input: string): string => {
   let formattedInput = input.replace(/[^\d]/g, '') // Solo numeri

   if (formattedInput.length >= 2) {
      formattedInput = formattedInput.substring(0, 2) + '-' + formattedInput.substring(2)
   }
   if (formattedInput.length >= 5) {
      formattedInput = formattedInput.substring(0, 5) + '-' + formattedInput.substring(5, 9)
   }

   return formattedInput
}
