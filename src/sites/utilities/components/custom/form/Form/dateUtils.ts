import { DATE_DISPLAY_REGEX, DATE_ISO_REGEX } from './constants'

/**
 * Converte una data dal formato ISO (yyyy-MM-dd) al formato display (dd-MM-yyyy)
 */
export const formatDateToDisplay = (dateValue: string): string => {
   if (!dateValue) return ''

   // Se già in formato display, verifica che sia valido
   if (DATE_DISPLAY_REGEX.test(dateValue)) {
      const [day, month, year] = dateValue.split('-')
      const testDate = new Date(`${year}-${month}-${day}`)
      if (!isNaN(testDate.getTime())) {
         return dateValue
      }
   }

   // Converte da formato ISO a formato display
   if (DATE_ISO_REGEX.test(dateValue)) {
      // Prima verifica che sia una data valida
      const testDate = new Date(dateValue)
      if (!isNaN(testDate.getTime())) {
         const [year, month, day] = dateValue.split('-')
         return `${day}-${month}-${year}`
      }
   }

   return ''
}

/**
 * Converte una data dal formato display (dd-MM-yyyy) al formato ISO (yyyy-MM-dd)
 */
export const formatDateToISO = (displayValue: string): string => {
   if (!displayValue) return ''

   // Se già in formato ISO valido, restituisce così com'è
   if (DATE_ISO_REGEX.test(displayValue)) {
      // Verifica che sia una data valida
      const testDate = new Date(displayValue)
      if (!isNaN(testDate.getTime())) {
         return displayValue
      }
   }

   // Converte da formato display a formato ISO
   if (DATE_DISPLAY_REGEX.test(displayValue)) {
      const [day, month, year] = displayValue.split('-')
      const isoDate = `${year}-${month}-${day}`

      // Verifica che la data convertita sia valida
      const testDate = new Date(isoDate)
      if (!isNaN(testDate.getTime())) {
         return isoDate
      }
   }

   return ''
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
