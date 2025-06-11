import Footer from '@/components/Footer'
import Navbar from '../components/Navbar'
import OfferHeader from '../components/Offers/OfferHeader'
import { useSelector } from 'react-redux'
import { selectTofId, selectTofList } from '@/sites/retail/features/quoteSlice'
import ContractData from '../components/Contract/ContractData'
import Recap from '../components/Contract/Recap'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Contract = () => {
   const tofId = useSelector(selectTofId)
   const tofList = useSelector(selectTofList)
   const offerTitle = tofList?.find((tof: any) => String(tof.id) === String(tofId))?.name || ''
   const headerTitle = offerTitle ? `Offerte ${offerTitle}` : 'Offerte'
   const navigate = useNavigate()
   const { t } = useTranslation()

   return (
      <div className="min-h-screen bg-white flex flex-col">
         <Navbar />
         <OfferHeader title={headerTitle} />
         <div className="mx-4 mb-12 mt-14 flex flex-col lg:flex-row gap-6">
            <div className="lg:basis-[60%] min-w-0">
               <ContractData />
               <hr className="my-6 border-gray-300" />
               <Button
                  className="w-[40%] bg-primary hover:bg-purple-700 rounded-3xl px-6"
                  onClick={() => navigate('telco/contract-signature')}
               >
                  {t('Concludi attivazione').toUpperCase()}
               </Button>
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
