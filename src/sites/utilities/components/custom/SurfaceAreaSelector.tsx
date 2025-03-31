import { useTranslation } from 'react-i18next'
import Box from './Box'
import SectionTitle from './texts/SectionTitle'
import Icon from '@mdi/react'
import { mdiTextureBox } from '@mdi/js'

interface SurfaceAreaSelectorProps {
   surfaceArea: string
   setSurfaceArea: (value: string) => void
}

const SurfaceAreaSelector = ({ surfaceArea, setSurfaceArea }: SurfaceAreaSelectorProps) => {
   const { t } = useTranslation()

   return (
      <div className="py-4">
         <div className="flex items-center">
            <Icon path={mdiTextureBox} className="text-[#515151] h-10 w-10 mr-2" />
            <h2 className="text-base font-medium text-primary-text">
               {t('Qual è la superficie della tua abitazione?')}
            </h2>
         </div>
         <input
            type="range"
            min="1"
            max="4"
            value={
               surfaceArea === '< 60'
                  ? 1
                  : surfaceArea === '60-80'
                  ? 2
                  : surfaceArea === '80-100'
                  ? 3
                  : surfaceArea === '> 100'
                  ? 4
                  : 1
            }
            onChange={e => {
               const value = parseInt(e.target.value)
               setSurfaceArea(value === 1 ? '< 60' : value === 2 ? '60-80' : value === 3 ? '80-100' : '> 100')
            }}
            className="range-selector py-4"
         />
         <div className="flex justify-between max-w-md mx-auto mb-4 text-sm text-gray-600">
            <span>&lt; 60mq</span>
            <span>60-80mq</span>
            <span>80-100mq</span>
            <span>&gt; 100mq</span>
         </div>
      </div>
   )
}

export default SurfaceAreaSelector
