import Navbar from './Navbar'
import OfferHeader from './Offers/OfferHeader'
import Footer from '@/components/Footer'
import { useSelector } from 'react-redux'
import { selectTofId, selectTofList } from '@/sites/retail/features/quoteSlice'
import React from 'react'
import StepIndicatorTelco from '../pages/StepIndicatorTelco'
import { useTranslation } from 'react-i18next'

interface TelcoContainerProps {
   children: React.ReactNode
   subtitle?: string
   step?: number
   offerTitle?: string
   hideStepIndicator?: boolean
   showTofList?: boolean
}

const TelcoContainer: React.FC<TelcoContainerProps> = ({
   children,
   subtitle,
   step = 3,
   offerTitle,
   hideStepIndicator = false,
   showTofList = true,
}) => {
   const { t } = useTranslation()
   const tofId = useSelector(selectTofId)
   const tofList = useSelector(selectTofList)
   const defaultOfferTitle = tofList?.find((tof: any) => String(tof.id) === String(tofId))?.name || ''
   const headerTitle =
      offerTitle || (defaultOfferTitle ? t('offers_with_name', { name: defaultOfferTitle }) : t('offers'))

   return (
      <div className="min-h-screen w-full bg-white flex flex-col">
         <Navbar showTofList={showTofList} />
         {!hideStepIndicator && <StepIndicatorTelco step={step} />}
         <div className="flex-1">
            <OfferHeader title={headerTitle} subtitle={subtitle} />
            {children}
         </div>
         <Footer />
      </div>
   )
}

export default TelcoContainer
