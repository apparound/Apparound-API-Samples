import { useNavigate } from 'react-router-dom'
import Navbar from '@/sites/telco/components/Navbar'
import StepIndicator from '@/sites/utilities/components/custom/StepIndicator'
import { useMediaQuery } from 'react-responsive'
import OfferCard from '@/sites/telco/components/OfferCard'
import MobileOfferOptions from '@/sites/telco/components/MobileOfferOptions'
import CheckCoverage from '@/sites/telco/components/CheckCoverage'
import OfferHeader from '@/sites/telco/components/OfferHeader'
import Footer from '@/components/Footer'
import { useSelector } from 'react-redux'
import { selectStartingProducts } from '@/sites/retail/features/quoteSlice'
import { useEffect } from 'react'

const Privato = () => {
   const navigate = useNavigate()
   const isMobile = useMediaQuery({ maxWidth: 767 })
   const startingProducts = useSelector(selectStartingProducts)

   useEffect(() => {
      if (!startingProducts) {
         console.error('Redux context is not available. Ensure the Provider is correctly set up.')
      }
   }, [startingProducts])

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
                     key={product.id}
                     imageSrc={'/src/sites/telco/assets/images/default.png'}
                     title={product.description}
                     onClick={() => navigate(`/offerta-${product.productName.toLowerCase()}`)}
                  />
               ))}
            </div>

            <MobileOfferOptions />
            <CheckCoverage />
         </main>

         <Footer />
      </div>
   )
}

export default Privato
