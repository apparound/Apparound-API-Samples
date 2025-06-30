import Navbar from './Navbar'
import OfferHeader from './Offers/OfferHeader'
import Footer from '@/components/Footer'
import { useSelector } from 'react-redux'
import { selectTofId, selectTofList } from '@/sites/retail/features/quoteSlice'
import React from 'react'
import StepIndicatorTelco from '../pages/StepIndicatorTelco'

interface TelcoContainerProps {
   children: React.ReactNode
   subtitle?: string
   step?: number
   offerTitle?: string
}

const TelcoContainer: React.FC<TelcoContainerProps> = ({ children, subtitle, step = 3, offerTitle }) => {
   const tofId = useSelector(selectTofId)
   const tofList = useSelector(selectTofList)
   const defaultOfferTitle = tofList?.find((tof: any) => String(tof.id) === String(tofId))?.name || ''
   const headerTitle = offerTitle || (defaultOfferTitle ? `Offerte ${defaultOfferTitle}` : 'Offerte')

   return (
      <div className="min-h-screen w-full bg-white flex flex-col">
         <Navbar />
         <StepIndicatorTelco step={step} />
         <OfferHeader title={headerTitle} subtitle={subtitle} />
         {children}
         <Footer />
      </div>
   )
}

export default TelcoContainer
