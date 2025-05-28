import { useNavigate } from 'react-router-dom'
import Navbar from '@/sites/telco/components/Navbar'
import { selectMainProduct, selectTofId, selectTofList } from '@/sites/retail/features/quoteSlice'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import OfferFullCards from '../components/Offers/OfferFullCards'
import Footer from '@/components/Footer'
import { useMediaQuery } from 'react-responsive'
import StepIndicator from '@/sites/utilities/components/custom/StepIndicator'
import OfferHeader from '../components/Offers/OfferHeader'
import { customSteps } from '@/sites/telco/config'

const OffertaHome = () => {
   const { t } = useTranslation()
   const isMobile = useMediaQuery({ maxWidth: 767 })
   const navigate = useNavigate()
   const mainProduct = useSelector(selectMainProduct)
   const [products, setProducts] = useState([])
   const tofList = useSelector(selectTofList)
   const tofId = useSelector(selectTofId)

   const offerTitle = tofList?.find((tof: any) => String(tof.id) === String(tofId))?.name || ''
   const headerTitle = offerTitle ? `Offerte ${offerTitle}` : 'Offerte'

   useEffect(() => {
      if (mainProduct?.clusters) {
         setProducts(mainProduct.clusters[1].products)
      }
   }, [mainProduct])

   return (
      <div className="min-h-screen bg-white">
         <Navbar showTofList={true} />
         <div className="w-full">
            {!isMobile ? (
               <StepIndicator step={2} customSteps={customSteps} />
            ) : (
               <div className="border-t-2 w-full" style={{ borderColor: '#f4f4f4' }}></div>
            )}
         </div>

         <OfferHeader title={headerTitle} />

         <main className="max-w-6xl mx-auto py-12 px-4">
            <h2 className="text-2xl font-bold text-primary mb-12 text-center">{t('Ecco le offerte pensate per te')}</h2>
            <OfferFullCards products={products} navigate={navigate} />

            <div className="bg-gray-50 rounded-lg p-8 text-center">
               <h3 className="text-2xl font-bold text-primary mb-4">Scarica l'app per gestire la tua offerta</h3>
               <p className="text-gray-600 mb-6">
                  Gestisci la tua offerta, monitora i consumi e ricevi assistenza direttamente dal tuo smartphone
               </p>
               <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                  alt="App"
                  className="max-w-md mx-auto rounded-lg shadow-lg"
               />
            </div>
         </main>

         <Footer />
      </div>
   )
}

export default OffertaHome
