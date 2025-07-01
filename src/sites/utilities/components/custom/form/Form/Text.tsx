import { useTranslation } from 'react-i18next'
import React from 'react'

// === IMPORTS ===
import {
   formatDateToISO,
   useDateInput,
   handleDateChange,
   handleRegularChange,
   handleDateFocus,
   handleDateBlur,
   getInputClasses,
   getLabelClasses,
   type TextProps,
} from './textUtils'

// === COMPONENT ===

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
   const isDate = inputType === 'date'

   // Utilizziamo l'hook personalizzato per la gestione delle date
   const { actualInputType, setActualInputType, displayValue, setDisplayValue } = useDateInput(isDate, value)

   // === EVENT HANDLERS ===

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value

      if (isDate) {
         handleDateChange(newValue, e, actualInputType, setDisplayValue, onChange, name)
      } else {
         handleRegularChange(newValue, e, setDisplayValue, onChange, name)
      }
   }

   const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      handleDateFocus(e, isDate, readonly, setActualInputType, displayValue, onFocus, name)
   }

   const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      handleDateBlur(e, isDate, setActualInputType, setDisplayValue, onBlur, name)
   }

   // === STYLING ===

   const showError = required && formSubmitted && (!displayValue || displayValue === '')

   // === RENDER ===

   return (
      <div className="relative">
         <input
            type={actualInputType || 'text'}
            name={name}
            id={name}
            className={getInputClasses(showError, readonly, className)}
            placeholder=" "
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
            value={displayValue}
            min={isDate && min ? formatDateToISO(min) : min}
            disabled={readonly}
         />
         <label htmlFor={name} className={getLabelClasses(labelClassName)}>
            {t(label)}
            {required ? '*' : ''}
         </label>
      </div>
   )
}

export default Text
