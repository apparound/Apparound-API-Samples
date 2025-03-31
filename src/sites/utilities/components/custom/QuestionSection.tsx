import RadioGroup from './RadioGroup'
import Icon from '@mdi/react'
import { useTranslation } from 'react-i18next'

interface QuestionSectionProps {
   title: string
   icon: string
   options: Array<{
      id: string
      label: string
   }>
   selected: string
   onSelect: (id: string) => void
}

const QuestionSection = ({ title, icon, options, selected, onSelect }: QuestionSectionProps) => {
   const { t } = useTranslation()

   return (
      <div className="question-section">
         <div className="flex items-center gap-2">
            <Icon path={icon} className="text-[#515151] h-10 w-10" />
            <h2 className="text-base font-medium  text-primary-text">{t(title)}</h2>
         </div>
         <RadioGroup options={options} selected={selected} onSelect={onSelect} />
      </div>
   )
}

export default QuestionSection
