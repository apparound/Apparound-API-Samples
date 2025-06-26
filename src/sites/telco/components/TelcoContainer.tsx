import Navbar from './Navbar'
import OfferHeader from './Offers/OfferHeader'
import Footer from '@/components/Footer'
import { useSelector } from 'react-redux'
import { selectTofId, selectTofList } from '@/sites/retail/features/quoteSlice'
import React from 'react'

interface TelcoContainerProps {
   children: React.ReactNode
   subtitle?: string
}

const TelcoContainer: React.FC<TelcoContainerProps> = ({ children, subtitle }) => {
   const tofId = useSelector(selectTofId)
   const tofList = useSelector(selectTofList)
   const offerTitle = tofList?.find((tof: any) => String(tof.id) === String(tofId))?.name || ''
   const headerTitle = offerTitle ? `Offerte ${offerTitle}` : 'Offerte'

   return (
      <div className="min-h-screen w-full bg-white flex flex-col">
         <Navbar />
         <OfferHeader title={headerTitle} subtitle={subtitle} />
         {children}
         <Footer />
      </div>
   )
}

export default TelcoContainer
