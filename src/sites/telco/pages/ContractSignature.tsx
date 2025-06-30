import React, { useState, useEffect } from 'react'
import TelcoContainer from '../components/TelcoContainer'
import { SERVER_URL } from '@/utils/fetcher'
import { Button } from '@/sites/utilities/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ApparoundData } from '@/hooks/use-apparound-data'

const ContractSignature: React.FC = () => {
   const [iframeLoaded, setIframeLoaded] = React.useState(false)
   const [offerTitle, setOfferTitle] = useState<string>('')
   const { t } = useTranslation()
   const navigate = useNavigate()
   const quotePdfUrl = `${SERVER_URL}/apparoundimages/v2/quote/${new ApparoundData().getQuoteId()}/pdf`

   useEffect(() => {
      const OFFER_TITLE_STORAGE_KEY = 'telco:offerTitle'
      const storedOfferTitle = localStorage.getItem(OFFER_TITLE_STORAGE_KEY)
      if (storedOfferTitle) {
         setOfferTitle(storedOfferTitle)
      }
   }, [])

   const concludeOffer = () => {
      navigate('/telco/contract', { state: { readOnly: true } })
   }

   return (
      <TelcoContainer step={4} offerTitle={offerTitle}>
         <h2 className="text-primary text-2xl font-semibold mb-2 mt-8">{t('Firma contratto')}</h2>
         <p className="mx-4 text-sm text-gray-600 mb-4">{t('Leggi il contratto e procedo in fondo con la firma')}</p>
         <div className="flex justify-center items-center w-full">
            <div className="bg-white rounded-2xl shadow-kiki-shadow p-4 w-full max-w-4xl">
               <iframe
                  onLoad={() => setIframeLoaded(true)}
                  src={quotePdfUrl}
                  className="min-h-[760px] w-full rounded-xl border"
                  width="100%"
                  height="100%"
               ></iframe>
            </div>
         </div>
         <Button
            className="min-w-[250px] bg-primary hover:bg-purple-700 rounded-3xl my-8 px-6 mx-auto block"
            onClick={concludeOffer}
         >
            {t('Firma contratto').toUpperCase()}
         </Button>
      </TelcoContainer>
   )
}

export default ContractSignature
