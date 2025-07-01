import Navbar from '@/sites/telco/components/Navbar'
import Offers from '@/sites/telco/components/Offers/Offers'
import { useNavigate } from 'react-router-dom'
import Footer from '@/components/Footer'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { reset as resetQuote } from '@/sites/retail/features/quoteSlice'
import { showLoader, reset as resetApp } from '@/sites/retail/features/appSlice'
import { initQuote } from '@/sites/telco/hooks/apparoundData'
import TelcoContainer from '../components/TelcoContainer'

const Index = () => {
   const dispatch = useDispatch()
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      const initialize = async () => {
         dispatch(resetQuote())
         dispatch(resetApp())
         dispatch(showLoader())
         await initQuote(dispatch)
         setIsLoading(false)
      }

      initialize()
   }, [dispatch])

   return (
      <div className="min-h-screen bg-white flex flex-col">
         <TelcoContainer step={1} hideStepIndicator>
            <Offers isLoading={isLoading} />
         </TelcoContainer>
      </div>
   )
}

export default Index
