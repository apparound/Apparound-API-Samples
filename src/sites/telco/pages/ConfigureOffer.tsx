import Navbar from '@/sites/telco/components/Navbar'
import StepIndicator from '@/sites/utilities/components/custom/StepIndicator'
import { useMediaQuery } from 'react-responsive'
import OfferHeader from '@/sites/telco/components/OfferHeader'
import Footer from '@/components/Footer'
import { useSelector } from 'react-redux'
import { selectMainProduct, selectStartingProducts, selectTofId } from '@/sites/retail/features/quoteSlice'
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

   if (!startingProducts || startingProducts.length === 0) {
      return null
   }
   return (
      <div className="min-h-screen bg-white">
         <Navbar />
         <div className="w-full">
            {!isMobile ? (
               <StepIndicator step={1} customSteps={['Configura', 'Scopri', 'Attiva', 'Inserisci i dati', 'Fine']} />
            ) : (
               <div className="border-t-2 w-full" style={{ borderColor: '#f4f4f4' }}></div>
            )}
         </div>

         <OfferHeader />

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

            <Products products={products} switchStates={switchStates} setSwitchStates={setSwitchStates} />
         </main>

         <Footer />
      </div>
   )
}

export default ConfigureOffer
