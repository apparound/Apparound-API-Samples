import React from 'react'
import { useTranslation } from 'react-i18next'

export interface OperatorSelectProps {
   value: string
   onChange: (value: string) => void
   label?: string
}

const operators = [
   { value: '', label: 'Seleziona operatore' },
   { value: 'vodafone', label: 'Vodafone' },
   { value: 'tim', label: 'TIM' },
   { value: 'wind', label: 'Wind' },
   { value: 'iliad', label: 'Iliad' },
   { value: 'fastweb', label: 'Fastweb' },
]

const OperatorSelect: React.FC<OperatorSelectProps> = ({ value, onChange, label }) => {
   const { t } = useTranslation()

   return (
      <div className="max-w-xs">
         {label && <label className="block text-left text-sm font-medium text-gray-700 mb-1">{label}</label>}
         <select
            className="block w-full rounded border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={t(value)}
            onChange={e => onChange(e.target.value)}
         >
            {operators.map(op => (
               <option key={op.value} value={op.value}>
                  {op.label}
               </option>
            ))}
         </select>
      </div>
   )
}

export default OperatorSelect
