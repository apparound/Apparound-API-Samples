import StepIndicator from '@/sites/utilities/components/custom/StepIndicator'
import { customSteps } from '@/sites/telco/config'
import { useMediaQuery } from 'react-responsive'

interface StepIndicatorTelcoProps {
   step: number
}

const StepIndicatorTelco = ({ step }: StepIndicatorTelcoProps) => {
   const isMobile = useMediaQuery({ maxWidth: 767 })
   return (
      <div className="w-full">
         {!isMobile ? (
            <StepIndicator step={step} customSteps={customSteps} hideCursor={true} />
         ) : (
            <div className="border-t-2 w-full" style={{ borderColor: '#f4f4f4' }}></div>
         )}
      </div>
   )
}

export default StepIndicatorTelco
