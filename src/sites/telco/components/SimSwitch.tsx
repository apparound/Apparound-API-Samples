import React from 'react'

interface SimSwitchProps {
   description: string
   value: number
   onChange: (value: number) => void
   icon: React.ReactNode
}

const SimSwitch: React.FC<SimSwitchProps> = ({ description, value, onChange, icon }) => (
   <div className="flex items-center justify-between p-4 bg-white rounded-2xl w-full max-w-3xl shadow-md">
      <div className="flex items-center gap-3">
         {icon}
         <span className="text-black text-lg">{description}</span>
      </div>
      <input
         type="number"
         min={0}
         value={value}
         onChange={e => onChange(Number(e.target.value))}
         className="w-20 px-2 py-1 border rounded text-center"
      />
   </div>
)

export default SimSwitch
