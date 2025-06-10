import Footer from '@/components/Footer'
import Navbar from '../components/Navbar'
import OfferHeader from '../components/Offers/OfferHeader'
import { useSelector } from 'react-redux'
import { selectTofId, selectTofList } from '@/sites/retail/features/quoteSlice'
import ContractData from '../components/Contract/ContractData'
import Recap from '../components/Contract/Recap'

const Contract = () => {
   const tofId = useSelector(selectTofId)
   const tofList = useSelector(selectTofList)
   const offerTitle = tofList?.find((tof: any) => String(tof.id) === String(tofId))?.name || ''
   const headerTitle = offerTitle ? `Offerte ${offerTitle}` : 'Offerte'

   return (
      <div className="min-h-screen bg-white flex flex-col">
         <Navbar />
         <OfferHeader title={headerTitle} />
         <div className="mx-4 mb-12 mt-14 flex flex-col lg:flex-row gap-6">
            <div className="lg:basis-[60%] min-w-0">
               <ContractData />
            </div>
            <div className="lg:basis-[40%] max-w-md w-full mx-auto">
               <Recap />
            </div>
         </div>
         <Footer />
      </div>
   )
}

export default Contract
