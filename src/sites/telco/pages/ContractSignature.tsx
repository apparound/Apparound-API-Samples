import React from 'react'
import TelcoContainer from '../components/TelcoContainer'
import { useSelector } from 'react-redux'
import { selectQuote } from '@/sites/retail/features/quoteSlice'
import { SERVER_URL } from '@/utils/fetcher'
import { Button } from '@/sites/utilities/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ApparoundData } from '@/hooks/use-apparound-data'

const ContractSignature: React.FC = () => {
   const [iframeLoaded, setIframeLoaded] = React.useState(false)
   const quote = useSelector(selectQuote)
   const sessionId = useSelector((state: any) => state.quote.sessionId)
   const quoteId = quote?.quoteId
   const { t } = useTranslation()
   const navigate = useNavigate()
   const quotePdfUrl = `${SERVER_URL}/apparoundimages/v2/quote/${new ApparoundData().getQuoteId()}/pdf`

   const concludeOffer = () => {
      navigate('/telco/contract', { state: { readOnly: true } })
   }

   return (
      <TelcoContainer>
         <h2 className="text-primary text-2xl font-semibold mb-2 mt-8">{t('Firma contratto')}</h2>
         <p className="text-sm text-gray-600 mb-4">Leggi il contratto e procedi in fondo con la firma</p>
         <div className="flex justify-center items-center w-full">
            <div className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-4xl">
               <iframe
                  onLoad={() => setIframeLoaded(true)}
                  src={quotePdfUrl}
                  className="min-h-[760px] w-full rounded-xl border"
                  width="100%"
                  height="100%"
               ></iframe>
            </div>
         </div>
         <div className="flex justify-center">
            <hr className="w-[60%] my-6 border-gray-300" />
         </div>
         <Button
            className="w-[40%] bg-primary hover:bg-purple-700 rounded-3xl px-6 mx-auto block mb-8"
            onClick={concludeOffer}
         >
            {t('Firma contratto').toUpperCase()}
         </Button>
      </TelcoContainer>
   )
}

export default ContractSignature
