import { useMediaQuery } from 'react-responsive'
import Logo from '@/assets/images/logo.png'
import StepIndicator from '@/sites/utilities/components/custom/StepIndicator'

const Header = ({ step }) => {
   const isMobile = useMediaQuery({ maxWidth: 767 })

   return (
      <div>
         <button onClick={() =>
         {
            window.location.href = '/'
         }} className='float-left'>
            <img src={Logo} alt="Apparound Logo" className="h-16"  />
         </button>
         <div className="container px-4 py-1 flex justify-between items-center"></div>
         <div className="w-full">
            {!isMobile ? (
               <StepIndicator step={step} />
            ) : (
               <div className="border-t-2 w-full" style={{ borderColor: '#f4f4f4' }}></div>
            )}
         </div>
      </div>
   )
}

export default Header
