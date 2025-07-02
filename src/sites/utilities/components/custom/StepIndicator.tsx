import { useNavigate, useLocation } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiProgressCheck, mdiCheckCircle, mdiArrowRight } from '@mdi/js'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Step {
   text: string
}

interface StepIndicatorProps {
   step: number
   customSteps?: string[]
   hideCursor?: boolean
}

const StepIndicator = ({ step: currentStep, customSteps, hideCursor = false }: StepIndicatorProps) => {
   const navigate = useNavigate()
   const location = useLocation()
   const { t } = useTranslation()
   const defaultSteps: Step[] = [
      { text: t('Inserisci dati fornitura') },
      { text: t('Configura offerta') },
      { text: t('Inserisci dati contatto') },
      { text: t('Firma contratto') },
   ]
   const steps: Step[] = customSteps ? customSteps.map(text => ({ text: t(text) })) : defaultSteps

   return (
      <div
         className="step-indicator w-full px-4 lg:px-24 border-t-2 whitespace-nowrap overflow-x-auto select-none"
         style={{ backgroundColor: '#f4f4f4', height: '50px' }}
      >
         {steps.map((step, index) => {
            const isActive: boolean = index < currentStep
            const isCurrent: boolean = index === currentStep
            return (
               <React.Fragment key={index}>
                  <div className="flex items-center">
                     <div
                        className={`step ${!hideCursor ? 'cursor-pointer' : ''}`}
                        onClick={() =>
                           step.text === 'Inserisci dati fornitura' && navigate('/', { state: location.state })
                        }
                     >
                        <div className={`step-number ${isActive ? 'text-primary' : ''}`}>
                           {' '}
                           <Icon
                              path={isActive ? mdiCheckCircle : mdiProgressCheck}
                              size={1}
                              color={isCurrent ? '#515151' : isActive ? '#8BAF4D' : '#999'}
                           />
                        </div>
                        <span className="step-text" style={{ color: index <= currentStep ? '#1D1B20' : '#999' }}>
                           {step.text}
                        </span>
                     </div>
                  </div>
                  {index < steps.length - 1 && (
                     <div className="flex-1 flex justify-center items-center">
                        <Icon path={mdiArrowRight} size={1} color="#9B9B9B" />
                     </div>
                  )}
               </React.Fragment>
            )
         })}
      </div>
   )
}

export default StepIndicator
