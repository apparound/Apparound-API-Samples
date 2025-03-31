import { mdiHomeThermometerOutline, mdiWaterThermometerOutline } from '@mdi/js'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ServiceSelector, Service } from '@/sites/utilities/components/custom/ServiceSelector'
import SurfaceAreaSelector from '@/sites/utilities/components/custom/SurfaceAreaSelector'
import QuestionSection from '@/sites/utilities/components/custom/QuestionSection'
import Box from '@/sites/utilities/components/custom/Box'
import SectionTitle from '@/sites/utilities/components/custom/texts/SectionTitle'
import { Product } from '@/interfaces/ProductInterfaces'
import { handleSelectMainService } from './handleSelectMainService'
import { Separator } from '@/sites/utilities/components/custom/Separator'
import ErrorToast from './ErrorToast'

interface HeatingTypes {
   houseHeatingType: { id: string; label: string }[]
   waterHeatingType: { id: string; label: string }[]
}

import heatingTypesData from './heatingTypes.json'

const heatingTypes = heatingTypesData as HeatingTypes

import { useConsumption } from '@/sites/utilities/context/ConsumptionContext'

const ConsumptionData = ({ onDataChange }) => {
   const { t } = useTranslation()
   const {
      selectedServices,
      setSelectedServices,
      surfaceArea,
      setSurfaceArea,
      selectedHouseHeatingType,
      setselectedHouseHeatingType,
      selectedWaterHeatingType,
      setselectedWaterHeatingType,
   } = useConsumption()

   const [services, setServices] = useState<Service[]>([])
   const [showErrorToast, setShowErrorToast] = useState(false)

   useEffect(() => {
      const storedProducts = localStorage.getItem('startingProducts')
      if (storedProducts) {
         const products: Product[] = JSON.parse(storedProducts)
         const mappedServices: Service[] = products.map((product: Product) => ({
            productId: product.productId,
            icon: product.productDetail?.icon || '',
            label: product.productShortName,
            tofProductId: product.offerTypeProductId,
         }))
         setServices(mappedServices)
      }
   }, [])

   const houseHeatingType = heatingTypes.houseHeatingType.map(type => ({
      id: type.id,
      label: t(type.label),
   }))

   const waterHeatingType = heatingTypes.waterHeatingType.map(type => ({
      id: type.id,
      label: t(type.label),
   }))

   useEffect(() => {
      onDataChange({ selectedServices, surfaceArea, selectedHouseHeatingType, selectedWaterHeatingType })
   }, [selectedServices, surfaceArea, selectedHouseHeatingType, selectedWaterHeatingType])

   return (
      <>
         <ErrorToast
            showErrorToast={showErrorToast}
            setShowErrorToast={setShowErrorToast}
            errorMessage={t('Si è verificato un errore durante la creazione del preventivo. Riprova più tardi.')}
         />
         <Box>
            <SectionTitle textKey="Di cosa hai bisogno?" />
            <div className="my-8"></div>
            <ServiceSelector
               selected={selectedServices}
               services={services}
               onSelectService={async service => {
                  const updatedServices = await handleSelectMainService(service, setSelectedServices, setShowErrorToast)
                  setSelectedServices(updatedServices)
               }}
            />
         </Box>

         <SectionTitle textKey="Dacci qualche dettaglio sulla tua situazione" />
         <div className="my-8"></div>
         <Box className="border-4 border-gray-300 rounded-lg p-4">
            <div className="space-y-6">
               <SurfaceAreaSelector surfaceArea={surfaceArea} setSurfaceArea={setSurfaceArea} />
               <Separator />
               <QuestionSection
                  title={t('Come riscaldi la tua abitazione?')}
                  icon={mdiHomeThermometerOutline}
                  options={houseHeatingType}
                  selected={selectedHouseHeatingType}
                  onSelect={setselectedHouseHeatingType}
               />
               <Separator />
               <QuestionSection
                  title={t("Come riscaldi l'acqua?")}
                  icon={mdiWaterThermometerOutline}
                  options={waterHeatingType}
                  selected={selectedWaterHeatingType}
                  onSelect={setselectedWaterHeatingType}
               />
            </div>
         </Box>
      </>
   )
}

export default ConsumptionData
