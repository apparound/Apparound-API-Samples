import { Card } from '@/sites/utilities/components/ui/card'
import { useEffect, useState } from 'react'
import InfoSection from './InfoSection'
import { useTranslation } from 'react-i18next'

interface OfferSummaryCardProps {
   selectedService: any
}

const OfferSummaryCard: React.FC<OfferSummaryCardProps> = ({ selectedService }) => {
   const { t } = useTranslation()
   const [price, setPrice] = useState<string | null>(null)
   const [currency, setCurrency] = useState<string | null>(null)

   useEffect(() => {
      const fetchQuote = () => {
         const currentQuote = JSON.parse(localStorage.getItem('currentQuote') || '{}')
         setPrice(currentQuote.netRecurringPriceWithVatAmount)
         setCurrency(currentQuote.currency)
      }
      fetchQuote()
   }, [])

   return (
      <div className="mb-12 mt-14">
         <Card className="p-2 mb-4 card-gradient-border border-0">
            <div className="p-4 w-full">
               <InfoSection />
            </div>
         </Card>
         <p className="text-[#9B9B9B] text-xs mt-6">
            {t('Prezzi stimati in base alle informazioni che ci hai fornito per calcolare i tuoi consumi in media.')}
            <br />
            {t('Importi reali da corrispondere')}
         </p>
      </div>
   )
}

export default OfferSummaryCard
