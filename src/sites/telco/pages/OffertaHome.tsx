import { useNavigate } from 'react-router-dom'
import Navbar from '@/sites/telco/components/Navbar'
import { selectMainProduct, selectTofId, selectTofList } from '@/sites/retail/features/quoteSlice'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import OfferFullCards from '../components/Offers/OfferFullCards'
import Footer from '@/components/Footer'
import { useMediaQuery } from 'react-responsive'
import OfferHeader from '../components/Offers/OfferHeader'
import StepIndicatorTelco from './StepIndicatorTelco'
import OfferHomeCarousel from '../components/Carousels/OfferHomeCarousel'

const OffertaHome = () => {
   const { t } = useTranslation()
   const navigate = useNavigate()
   const mainProduct = useSelector(selectMainProduct)
   const [products, setProducts] = useState([])
   const tofList = useSelector(selectTofList)
   const tofId = useSelector(selectTofId)

   const offerTitle = tofList?.find((tof: any) => String(tof.id) === String(tofId))?.name || ''
   const headerTitle = offerTitle ? `Offerte ${offerTitle}` : 'Offerte'

   useEffect(() => {
      if (mainProduct?.clusters) {
         const lastCluster = mainProduct.clusters[mainProduct.clusters.length - 1]
         setProducts(lastCluster.products)
      }
   }, [mainProduct])

   return (
      <div className="min-h-screen bg-white">
         <Navbar showTofList={true} />
         <StepIndicatorTelco step={1} />

         <OfferHeader title={headerTitle} />

         <main className="max-w-6xl mx-auto py-12 px-4">
            <h2 className="text-2xl font-bold text-primary mb-12 text-center">{t('Ecco le offerte pensate per te')}</h2>
            <OfferFullCards products={products} navigate={navigate} />
         </main>

         <OfferHomeCarousel />
         <div className="py-12" />
         <Footer />
      </div>
   )
}

export default OffertaHome
