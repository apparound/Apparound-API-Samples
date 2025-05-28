import Navbar from '@/sites/telco/components/Navbar'
import { useMediaQuery } from 'react-responsive'
import OfferHeader from '@/sites/telco/components/Offers/OfferHeader'
import Footer from '@/components/Footer'
import { useSelector } from 'react-redux'
import {
   selectCart,
   selectMainProduct,
   selectStartingProducts,
   selectTofId,
   selectTofList,
} from '@/sites/retail/features/quoteSlice'
import { useState, useEffect } from 'react'
import { addProduct, deleteProduct } from '@/sites/telco/hooks/apparoundData'
import { useDispatch } from 'react-redux'
import MainProducts from '@/sites/telco/components/MainProducts'
import Products from '@/sites/telco/components/Products'
import { useTranslation } from 'react-i18next'
import StepIndicatorTelco from './StepIndicatorTelco'

const ConfigureOffer = () => {
   const { t } = useTranslation()
   const isMobile = useMediaQuery({ maxWidth: 767 })
   const startingProducts = useSelector(selectStartingProducts)
   const tofId = useSelector(selectTofId)
   const dispatch = useDispatch()
   const mainProduct = useSelector(selectMainProduct)
   const [products, setProducts] = useState([])
   const [switchStates, setSwitchStates] = useState({})
   const [selectedOfferGuid, setSelectedOfferGuid] = useState<string | null>(null)
   const cart = useSelector(selectCart)
   const tofList = useSelector(selectTofList)
   const [addingMainProductGuid, setAddingMainProductGuid] = useState<string | null>(null)

   const offerTitle = tofList?.find((tof: any) => String(tof.id) === String(tofId))?.name || ''
   const headerTitle = offerTitle ? `Offerte ${offerTitle}` : 'Offerte'

   useEffect(() => {
      if (mainProduct?.clusters) {
         setProducts(mainProduct.clusters[0].products)
         const initialSwitches = {}
         mainProduct.clusters[0].products.forEach(p => {
            initialSwitches[p.guid] = false
         })
         setSwitchStates(initialSwitches)
      }
   }, [mainProduct])

   useEffect(() => {
      if (cart) {
         const updatedSwitchStates = { ...switchStates }
         Object.keys(cart).forEach(clusterGuid => {
            Object.keys(cart[clusterGuid]).forEach(productGuid => {
               if (cart[clusterGuid][productGuid]) {
                  updatedSwitchStates[productGuid] = true
               }
            })
         })
         setSwitchStates(updatedSwitchStates)
      }
   }, [cart])

   function cartContainsGuid(cartObj: any, guid: string): boolean {
      if (!cartObj || typeof cartObj !== 'object') return false
      if (cartObj[guid]) return true
      return Object.values(cartObj).some(value => cartContainsGuid(value, guid))
   }

   useEffect(() => {
      if (startingProducts && startingProducts.length > 0 && cart) {
         const found = startingProducts.find(p => cartContainsGuid(cart, p.guid))
         if (found) {
            setSelectedOfferGuid(found.guid)
         }
      }
   }, [startingProducts, cart])

   const handleSelectMainProduct = async (guid: string) => {
      if (selectedOfferGuid) {
         setProducts([])
         await deleteProduct(selectedOfferGuid, dispatch)
      }
      setSelectedOfferGuid(guid)
   }

   if (!startingProducts || startingProducts.length === 0) {
      return null
   }
   return (
      <div className="min-h-screen bg-white">
         <Navbar showTofList={true} />
         <StepIndicatorTelco step={1} />

         <OfferHeader title={headerTitle} />

         <main className="max-w-4xl mx-auto py-12 px-4">
            <h2 className="text-2xl font-bold text-primary mb-8 text-center">{t('Configura la tua offerta')}</h2>

            <MainProducts
               startingProducts={startingProducts}
               selectedOfferGuid={selectedOfferGuid}
               setSelectedOfferGuid={handleSelectMainProduct}
               addProduct={addProduct}
               dispatch={dispatch}
               tofId={tofId}
               addingProductGuid={addingMainProductGuid}
               setAddingProductGuid={setAddingMainProductGuid}
            />

            <Products
               products={products}
               switchStates={switchStates}
               setSwitchStates={setSwitchStates}
               addProduct={addProduct}
               dispatch={dispatch}
               tofId={tofId}
               parentGuid={mainProduct?.guid}
            />
         </main>

         <Footer />
      </div>
   )
}

export default ConfigureOffer
