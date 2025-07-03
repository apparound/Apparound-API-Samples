import React from 'react'
import { useTranslation } from 'react-i18next'

interface NumberLinesProps {
   quantity: number
   phoneNumbers: string[]
   phoneIds: string[]
   onPhoneNumberChange: (index: number, value: string) => void
   onPhoneIdChange: (index: number, value: string) => void
   onInputBlur?: (index: number, type: 'phoneNumber' | 'phoneId') => void
}

const NumberLines: React.FC<NumberLinesProps> = ({
   quantity,
   phoneNumbers,
   phoneIds,
   onPhoneNumberChange,
   onPhoneIdChange,
   onInputBlur,
}) => {
   const { t } = useTranslation()
   return (
      <div className="flex flex-col gap-2 mt-2">
         {Array.from({ length: quantity }).map((_, idx) => (
            <div key={idx} className="flex gap-2">
               <input
                  type="text"
                  name={`phoneNumber-${idx}`}
                  className="border rounded px-2 py-1 flex-1"
                  placeholder={t('Numero di telefono') + ' ' + (idx + 1)}
                  value={phoneNumbers[idx] || ''}
                  onChange={e => onPhoneNumberChange(idx, e.target.value)}
                  onBlur={() => onInputBlur && onInputBlur(idx, 'phoneNumber')}
               />
               <input
                  type="text"
                  name={`phoneId-${idx}`}
                  className="border rounded px-2 py-1 flex-1"
                  placeholder={t('Identificativo') + ' ' + (idx + 1)}
                  value={phoneIds[idx] || ''}
                  onChange={e => onPhoneIdChange(idx, e.target.value)}
                  onBlur={() => onInputBlur && onInputBlur(idx, 'phoneId')}
               />
            </div>
         ))}
      </div>
   )
}

export default NumberLines
