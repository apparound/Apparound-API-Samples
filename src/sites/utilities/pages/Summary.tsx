import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/sites/utilities/components/ui/button'
import Header from '@/sites/utilities/components/custom/Header'
import OfferSummaryCard from '@/sites/utilities/components/custom/OfferSummaryCard'
import DetailsSections from '@/sites/utilities/components/custom/DetailsSections'
import MainContainer from '@/sites/utilities/components/custom/MainContainer'
import Title from '@/sites/utilities/components/custom/texts/Title'
import { useConsumption } from '@/sites/utilities/context/ConsumptionContext'
import Footer from '@/components/Footer'
import CustomerModal from '@/components/Customer/Modal'
import { getAllMainProductsIds } from '@/utils/treeManager'
import { Separator } from '../components/ui/separator'

const Summary = () => {
   const { t } = useTranslation()
   const { selectedService } = useConsumption()
   const mainProductIds = getAllMainProductsIds()
   const [showModal, setShowModal] = useState(false)

   return (
      <div className="min-h-screen flex flex-col justify-center max-h-screen overflow-hidden">
         <Header step={1} />
         <MainContainer>
            <div className="max-w-3xl mx-auto px-5 lg:px-0 h-full">
               <Title textKey="L'offerta adatta a te" />
               <OfferSummaryCard selectedService={selectedService} />
               {mainProductIds.map(id => (
                  <DetailsSections key={id} mainServiceId={id} />
               ))}
               <div className="mt-8 text-center">
                  <Separator className="my-4" />
                  <Button
                     onClick={() => setShowModal(true)}
                     className="bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                     {t('Richiedi attivazione').toUpperCase()}
                  </Button>
               </div>
            </div>
         </MainContainer>
         <Footer />
         <CustomerModal showModal={showModal} setShowModal={setShowModal} />
      </div>
   )
}

export default Summary
