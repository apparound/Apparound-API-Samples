import React from 'react'
import { formatDateToDisplay, formatDateToISO, formatDateInput } from './dateUtils'
import { handleOnChange } from './utils'
import type { OnChangeFunction, OnChangeEvent } from './types'

/**
 * Gestisce i cambiamenti per input di tipo data
 */
export const handleDateChange = (
   newValue: string,
   e: React.ChangeEvent<HTMLInputElement>,
   actualInputType: string | undefined,
   setDisplayValue: (value: string) => void,
   onChange: OnChangeFunction | OnChangeEvent,
   name: string
) => {
   if (actualInputType === 'date') {
      // Picker nativo: il valore è in formato yyyy-MM-dd
      const formattedValue = formatDateToDisplay(newValue)
      setDisplayValue(formattedValue)
      handleOnChange(onChange, formattedValue, name, e)
   } else {
      // Input di testo: formattazione manuale
      const formattedInput = formatDateInput(newValue)
      setDisplayValue(formattedInput)
      handleOnChange(onChange, formattedInput, name, e)
   }
}

/**
 * Gestisce i cambiamenti per input normali
 */
export const handleRegularChange = (
   newValue: string,
   e: React.ChangeEvent<HTMLInputElement>,
   setDisplayValue: (value: string) => void,
   onChange: OnChangeFunction | OnChangeEvent,
   name: string
) => {
   setDisplayValue(newValue)
   handleOnChange(onChange, newValue, name, e)
}

/**
 * Gestisce l'evento di focus per input di tipo data
 */
export const handleDateFocus = (
   e: React.FocusEvent<HTMLInputElement>,
   isDate: boolean,
   readonly: boolean,
   setActualInputType: (type: string) => void,
   displayValue: string,
   onFocus?: (event: React.FocusEvent<HTMLInputElement>, name: string) => void,
   name?: string
) => {
   if (isDate && !readonly) {
      // Attiva il picker nativo per le date
      setActualInputType('date')
      const isoValue = formatDateToISO(displayValue)
      e.target.value = isoValue

      // Mostra il picker solo se l'utente ha cliccato direttamente sull'input
      // e solo se il browser supporta showPicker e la funzione è disponibile
      setTimeout(() => {
         try {
            if (e.target.showPicker && typeof e.target.showPicker === 'function') {
               e.target.showPicker()
            }
         } catch (error) {
            // Ignora l'errore se showPicker non può essere chiamato
            // (ad esempio quando non c'è user gesture)
            console.debug('showPicker non disponibile:', error)
         }
      }, 0)
   }

   if (onFocus && name) {
      onFocus(e, name)
   }
}

/**
 * Gestisce l'evento di blur per input di tipo data
 */
export const handleDateBlur = (
   e: React.FocusEvent<HTMLInputElement>,
   isDate: boolean,
   setActualInputType: (type: string) => void,
   setDisplayValue: (value: string) => void,
   onBlur?: (event: React.FocusEvent<HTMLInputElement>, name: string) => void,
   name?: string
) => {
   if (isDate) {
      // Ritorna alla modalità text se non c'è valore o mantiene la formattazione
      setActualInputType('text')
      if (!e.target.value) {
         setDisplayValue('')
      }
   }

   if (onBlur && name) {
      onBlur(e, name)
   }
}
