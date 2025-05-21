import Navbar from '@/sites/telco/components/Navbar'
import StepIndicator from '@/sites/utilities/components/custom/StepIndicator'
import { useMediaQuery } from 'react-responsive'
import OfferCard from '@/sites/telco/components/OfferCard'
import CheckCoverage from '@/sites/telco/components/CheckCoverage/CheckCoverage'
import OfferHeader from '@/sites/telco/components/OfferHeader'
import Footer from '@/components/Footer'
import { useSelector } from 'react-redux'
import { selectMainProduct, selectStartingProducts, selectTofId } from '@/sites/retail/features/quoteSlice'
import { useState, useEffect } from 'react'
import { addProduct } from '@/sites/telco/hooks/apparoundData'
import { useDispatch } from 'react-redux'
import ProductSwitch from '@/sites/telco/components/ProductSwitch'

const ConfigureOffer = () => {
   const isMobile = useMediaQuery({ maxWidth: 767 })
   const startingProducts = useSelector(selectStartingProducts)
   const tofId = useSelector(selectTofId)
   const dispatch = useDispatch()
   const mainProduct = useSelector(selectMainProduct)
   const [products, setProducts] = useState([])
   const [switchStates, setSwitchStates] = useState({})

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

            <div className="flex flex-wrap gap-8 mb-12 justify-center">
               {startingProducts.map(product => (
                  <OfferCard
                     key={product.guid}
                     imageSrc={'/src/sites/telco/assets/images/default.png'}
                     title={product.description}
                     onClick={async () => {
                        await addProduct(product.guid, dispatch, tofId)
                     }}
                  />
               ))}
            </div>

            {/* Switch per i products */}
            {products.length > 0 && (
               <div className="space-y-4 mb-8 flex flex-col items-center gap-4">
                  {products.map(product =>
                     product.description === 'Verifica copertura' ? (
                        <CheckCoverage key={product.guid} />
                     ) : (
                        <ProductSwitch
                           key={product.guid}
                           description={product.description}
                           checked={!!switchStates[product.guid]}
                           onChange={() =>
                              setSwitchStates(prev => ({
                                 ...prev,
                                 [product.guid]: !prev[product.guid],
                              }))
                           }
                        />
                     )
                  )}
               </div>
            )}
         </main>

         <Footer />
      </div>
   )
}

export default ConfigureOffer
