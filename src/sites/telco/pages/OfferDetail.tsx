import StepIndicatorTelco from './StepIndicatorTelco'
import Navbar from '../components/Navbar'
import OfferHeader from '../components/Offers/OfferHeader'
import Footer from '@/components/Footer'
import { useTranslation } from 'react-i18next'
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
import { findNodeForKey } from '@/hooks/useQuote'

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
      if (!products.length || !cart) {
         setAddons([])
         return
      }

      let cartGuids: string[] = Array.isArray(cart)
         ? cart
         : typeof cart === 'object' && cart !== null
         ? Object.keys(cart[Object.keys(cart)[0]] || {})
         : []

      const selectedProduct = products.find((p: any) => cartGuids.includes(p.guid))
      let newAddons: any[] = []

      if (selectedProduct?.clusters) {
         setOfferTitle(t(selectedProduct.description))
         newAddons = [...selectedProduct.clusters]
      }

      if (tree) {
         let treeProducts = cartGuids.map(guid => findNodeForKey('guid', guid, tree)).filter(node => node)
         if (treeProducts.length > 0) {
            // Hardcoded activation product
            const activationProduct = {
               id: 1,
               label: t('Attivazione offerta'),
               price: quotePrice,
               guid: crypto.randomUUID(),
               config: {
                  mdiIcon: 'mdiRocketLaunch',
               },
            }
            treeProducts = [activationProduct, ...treeProducts]
            //Aggiungo fake product attivazione
            const carrelloObj = {
               id: 2,
               label: t('Carrello'),
               products: treeProducts,
            }
            setAddons([carrelloObj, ...newAddons])
            return
         }
      }

      setAddons(newAddons)
   }, [products, cart, tree])

   return (
      <div className="min-h-screen bg-white">
         <Navbar showTofList={true} />
         <StepIndicatorTelco step={3} />

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
