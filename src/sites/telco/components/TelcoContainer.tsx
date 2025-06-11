import Navbar from './Navbar'
import OfferHeader from './Offers/OfferHeader'
import Footer from '@/components/Footer'
import { useSelector } from 'react-redux'
import { selectTofId, selectTofList } from '@/sites/retail/features/quoteSlice'
import React from 'react'

interface TelcoContainerProps {
   children: React.ReactNode
}

const TelcoContainer: React.FC<TelcoContainerProps> = ({ children }) => {
   const tofId = useSelector(selectTofId)
   const tofList = useSelector(selectTofList)
   const offerTitle = tofList?.find((tof: any) => String(tof.id) === String(tofId))?.name || ''
   const headerTitle = offerTitle ? `Offerte ${offerTitle}` : 'Offerte'

   return (
      <div className="min-h-screen bg-white flex flex-col">
         <Navbar />
         <OfferHeader title={headerTitle} />
         {children}
         <Footer />
      </div>
   )
}

export default TelcoContainer
