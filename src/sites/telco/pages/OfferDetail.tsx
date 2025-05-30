import StepIndicatorTelco from './StepIndicatorTelco'
import Navbar from '../components/Navbar'
import OfferHeader from '../components/Offers/OfferHeader'
import Footer from '@/components/Footer'
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectCart, selectMainProduct } from '@/sites/retail/features/quoteSlice'
import { useEffect, useState } from 'react'
import Addons from './Addons'
import OfferPriceBox from '../components/OfferBox'

const OfferDetail = () => {
   const isMobile = useMediaQuery({ maxWidth: 767 })
   const { t } = useTranslation()
   const [offerTitle, setOfferTitle] = useState('')
   const cart = useSelector(selectCart)
   const [addons, setAddons] = useState([])

   const mainProduct = useSelector(selectMainProduct)
   const [products, setProducts] = useState([])

   useEffect(() => {
      if (mainProduct?.clusters) {
         const lastCluster = mainProduct.clusters[mainProduct.clusters.length - 1]
         setProducts(lastCluster.products || [])
      }
   }, [mainProduct])

   useEffect(() => {
      if (!products.length || !cart) {
         setAddons([])
         return
      }

      const cartGuids = Object.keys(cart[Object.keys(cart)[0]] || {})
      const selectedProduct = products.find((p: any) => cartGuids.includes(p.guid))
      if (selectedProduct && Array.isArray(selectedProduct.clusters)) {
         setOfferTitle(t(selectedProduct.description))
         setAddons(selectedProduct.clusters)
         return
      }
      setAddons([])
   }, [products, cart])

   return (
      <div className="min-h-screen bg-white">
         <Navbar showTofList={true} />
         <StepIndicatorTelco step={3} />

         <OfferHeader title={offerTitle} />
         {addons.length > 0 && <Addons addons={addons} />}

         <OfferPriceBox activationPrice="30,00" monthlyPrice="38,99" onActivate={() => {}} />

         <Footer />
      </div>
   )
}

export default OfferDetail
