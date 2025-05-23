import Navbar from '@/sites/telco/components/Navbar'
import StepIndicator from '@/sites/utilities/components/custom/StepIndicator'
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
import { addProduct } from '@/sites/telco/hooks/apparoundData'
import { useDispatch } from 'react-redux'
import MainProducts from '@/sites/telco/components/MainProducts'
import Products from '@/sites/telco/components/Products'

const ConfigureOffer = () => {
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

   // Update the switch states based on the cart
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

   // Setta il mainProduct selezionato se presente nel cart
   useEffect(() => {
      if (startingProducts && startingProducts.length > 0 && cart) {
         const found = startingProducts.find(p => cartContainsGuid(cart, p.guid))
         if (found) {
            setSelectedOfferGuid(found.guid)
         }
      }
   }, [startingProducts, cart])

   if (!startingProducts || startingProducts.length === 0) {
      return null
   }
   return (
      <div className="min-h-screen bg-white">
         <Navbar showTofList={true} />
         <div className="w-full">
            {!isMobile ? (
               <StepIndicator step={1} customSteps={['Configura', 'Scopri', 'Attiva', 'Inserisci i dati', 'Fine']} />
            ) : (
               <div className="border-t-2 w-full" style={{ borderColor: '#f4f4f4' }}></div>
            )}
         </div>

         <OfferHeader title={headerTitle} />

         <main className="max-w-4xl mx-auto py-12 px-4">
            <h2 className="text-2xl font-bold text-primary mb-8 text-center">Configura la tua offerta</h2>

            <MainProducts
               startingProducts={startingProducts}
               selectedOfferGuid={selectedOfferGuid}
               setSelectedOfferGuid={setSelectedOfferGuid}
               addProduct={addProduct}
               dispatch={dispatch}
               tofId={tofId}
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
