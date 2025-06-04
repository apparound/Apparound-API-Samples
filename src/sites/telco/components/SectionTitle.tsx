import React from 'react'
import { useTranslation } from 'react-i18next'

interface SectionTitleProps {
   text: string
   className?: string
}

const SectionTitle: React.FC<SectionTitleProps> = ({ text, className = '' }) => {
   const { t } = useTranslation()
   return (
      <div className={`w-full h-[40px] bg-[#F4F4F4] my-8 flex items-center ${className}`}>
         <div className="text-primary text-left font-bold ml-2 text-lg">{t(text)}</div>
      </div>
   )
}

export default SectionTitle
