import React from 'react'

export interface PortabilityOptionProps {
   value: string
   label: string
   checked: boolean
   onChange: (value: string) => void
}

const PortabilityOption: React.FC<PortabilityOptionProps> = ({ value, label, checked, onChange }) => (
   <label className="flex items-center gap-2 cursor-pointer mb-2">
      <input
         type="radio"
         name="phoneType"
         value={value}
         checked={checked}
         onChange={() => onChange(value)}
         className="mt-1 accent-purple-700"
      />
      <span className="text-gray-700">{label}</span>
   </label>
)

export default PortabilityOption
