import StepIndicatorTelco from './StepIndicatorTelco'
import Navbar from '../components/Navbar'
import OfferHeader from '../components/Offers/OfferHeader'
import Footer from '@/components/Footer'
import { useSelector } from 'react-redux'
import {
   selectCart,
   selectMainProduct,
   selectQuoteMontlyPrice,
   selectQuotePrice,
   selectTree,
} from '@/sites/retail/features/quoteSlice'
import { useEffect, useState } from 'react'
import Addons from './Addons'
import OfferPriceBox from '../components/OfferBox'
import CustomerModal from '../components/CustomerModal'
import { getAddons } from './getAddons'
import { useTranslation } from 'react-i18next'

const OfferDetail = () => {
   const { t } = useTranslation()
   const [offerTitle, setOfferTitle] = useState('')
   const cart = useSelector(selectCart)
   const tree = useSelector(selectTree)
   const [addons, setAddons] = useState([])

   const mainProduct = useSelector(selectMainProduct)
   const [products, setProducts] = useState([])
   const quotePrice = useSelector(selectQuotePrice)
   const quoteMonthlyPrice = useSelector(selectQuoteMontlyPrice)
   const [showCustomerModal, setShowCustomerModal] = useState(false)

   useEffect(() => {
      if (mainProduct?.clusters) {
         const lastCluster = mainProduct.clusters[mainProduct.clusters.length - 1]
         setProducts(lastCluster.products || [])
      }
   }, [mainProduct])

   useEffect(() => {
      setAddons(
         getAddons({
            products,
            cart,
            tree,
            quotePrice,
            setOfferTitle,
            t,
         })
      )
   }, [products, cart, tree])

   return (
      <div className="min-h-screen bg-white">
         <Navbar showTofList={true} />
         <StepIndicatorTelco step={2} />

         <OfferHeader title={offerTitle} />
         {addons.length > 0 && (
            <Addons addons={addons} includedProducts={addons[0]?.products?.map((p: any) => p.guid) || []} />
         )}

         <OfferPriceBox
            activationPrice={quotePrice.toString()}
            monthlyPrice={quoteMonthlyPrice.toString()}
            onActivate={() => setShowCustomerModal(true)}
         />
         {showCustomerModal && <CustomerModal showModal={showCustomerModal} setShowModal={setShowCustomerModal} />}

         <Footer />
      </div>
   )
}

export default OfferDetail
