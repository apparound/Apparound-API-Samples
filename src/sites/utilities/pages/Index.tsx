import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Header from '@/sites/utilities/components/custom/Header'
import { Button } from '@/sites/utilities/components/ui/button'
import MainContainer from '@/sites/utilities/components/custom/MainContainer'
import Title from '@/sites/utilities/components/custom/texts/Title'
import ConsumptionSections from '@/sites/utilities/components/custom/dataCollecting/ConsumptionSections'
import ConsumptionData from '@/sites/utilities/components/custom/dataCollecting/ConsumptionGatherData'
import { ApparoundData } from '@/sites/utilities/hooks/use-apparound-data'
import { initializeCustomer } from '@/sites/utilities/utils/customerUtils'
import Footer from '@/components/Footer.tsx'
import ConsumptionCard from '@/sites/utilities/components/custom/ConsumptionCard.tsx'
import useRelativeNavigate from '@/utils/navigate'
import { Separator } from '../components/ui/separator'

const Index = () => {
   const navigate = useRelativeNavigate()
   const { t } = useTranslation()
   const [showSections, setShowSections] = useState(false)
   const [startingProductsLoaded, setStartingProductsLoaded] = useState(false)
   const sectionsRef = useRef(null)
   const [showCard, setShowCard] = useState(false)
   const [consumptionData, setConsumptionData] = useState({})
   const [isCalculateButtonEnabled, setIsCalculateButtonEnabled] = useState(false)

   const handleCalculate = () => {
      setShowSections(true)
      setShowCard(true)
   }

   const handleDataChange = data => {
      setConsumptionData(data)
   }

   useEffect(() => {
      const selectedServices = JSON.parse(localStorage.getItem('selectedServices') || '[]')
      const selectedHouseHeatingType = localStorage.getItem('selectedHouseHeatingType')
      const selectedWaterHeatingType = localStorage.getItem('selectedWaterHeatingType')

      if (selectedServices.length > 0 && selectedHouseHeatingType && selectedWaterHeatingType) {
         setIsCalculateButtonEnabled(true)
      } else {
         setIsCalculateButtonEnabled(false)
      }
   }, [consumptionData])

   useEffect(() => {
      const fetchToken = async () => {
         const apparoundData = new ApparoundData()
         const token = await apparoundData.getToken()
         localStorage.setItem('token', token.token)
      }

      const initialize = async () => {
         await fetchToken()
         await initializeCustomer(setStartingProductsLoaded)
      }

      initialize()
   }, [])

   useEffect(() => {
      if (showSections && sectionsRef.current) {
         sectionsRef.current.scrollIntoView({ behavior: 'smooth' })
      }
   }, [showSections])

   return (
      <div className="min-h-screen flex flex-col justify-center max-h-screen overflow-hidden">
         <Header step={0} />
         <MainContainer>
            <div className="max-w-3xl mx-auto px-5 lg:px-0 h-full">
               <Title textKey="Dati fornitura" />
               <p className="text-center text-m text-primary-text mb-8">{t('landingSubtitle')}</p>
               {startingProductsLoaded && <ConsumptionData onDataChange={handleDataChange} />}
               {startingProductsLoaded && !showSections && (
                  <div className="mt-8 text-center">
                     <Separator className="my-4" />
                     <Button
                        size="lg"
                        className="bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
                        onClick={handleCalculate}
                        disabled={!isCalculateButtonEnabled}
                     >
                        {t('Calcola consumi').toUpperCase()}
                     </Button>
                  </div>
               )}
               {showCard && <ConsumptionCard data={consumptionData} />}
               {showSections && (
                  <div ref={sectionsRef}>
                     <div className="mt-8" />
                     <ConsumptionSections navigate={navigate} />
                  </div>
               )}
            </div>
         </MainContainer>
         <Footer />
      </div>
   )
}

export default Index
