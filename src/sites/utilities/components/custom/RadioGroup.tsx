import Icon from '@mdi/react'
import { mdiCheckCircle, mdiCheckboxBlankCircleOutline } from '@mdi/js'

interface RadioGroupProps {
   options: Array<{
      id: string
      label: string
   }>
   selected: string
   onSelect: (id: string) => void
}

const RadioGroup = ({ options, selected, onSelect }: RadioGroupProps) => {
   return (
      <div className="radio-group flex justify-center">
         {options.map(option => (
            <div
               key={`radio-option-${option.id}`}
               className={`radio-option ${selected === option.id ? 'selected' : ''} flex flex-col items-center mx-2`}
               onClick={() => onSelect(option.id)}
               style={{ border: 'none' }}
            >
               {selected === option.id ? (
                  <Icon path={mdiCheckCircle} size={1} className="text-primary" />
               ) : (
                  <Icon path={mdiCheckboxBlankCircleOutline} size={1} className="text-primary" />
               )}
               <span className="text-sm text-center">{option.label}</span>
            </div>
         ))}
      </div>
   )
}

export default RadioGroup
