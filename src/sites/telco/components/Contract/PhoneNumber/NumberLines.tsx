import React from 'react'
import { useTranslation } from 'react-i18next'

interface NumberLinesProps {
   quantity: number
   phoneNumbers: string[]
   phoneIds: string[]
   onPhoneNumberChange: (index: number, value: string) => void
   onPhoneIdChange: (index: number, value: string) => void
}

const NumberLines: React.FC<NumberLinesProps> = ({
   quantity,
   phoneNumbers,
   phoneIds,
   onPhoneNumberChange,
   onPhoneIdChange,
}) => {
   const { t } = useTranslation()
   return (
      <div className="flex flex-col gap-2 mt-2">
         {Array.from({ length: quantity }).map((_, idx) => (
            <div key={idx} className="flex gap-2">
               <input
                  type="text"
                  className="border rounded px-2 py-1 flex-1"
                  placeholder={t('Numero di telefono') + ' ' + (idx + 1)}
                  value={phoneNumbers[idx] || ''}
                  onChange={e => onPhoneNumberChange(idx, e.target.value)}
               />
               <input
                  type="text"
                  className="border rounded px-2 py-1 flex-1"
                  placeholder={t('Identificativo') + ' ' + (idx + 1)}
                  value={phoneIds[idx] || ''}
                  onChange={e => onPhoneIdChange(idx, e.target.value)}
               />
            </div>
         ))}
      </div>
   )
}

export default NumberLines
