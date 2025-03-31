import React, { useState } from 'react'
import Header from '@/sites/utilities/components/custom/Header'
import Footer from '@/components/Footer'
import Title from '@/sites/utilities/components/custom/texts/Title'
import MainContainer from '@/sites/utilities/components/custom/MainContainer'
import { useTranslation } from 'react-i18next'
import { Button } from '@/sites/utilities/components/ui/button'
import Card from '@/sites/utilities/components/custom/Card'
import useRelativeNavigate from '@/utils/navigate'
import { ApparoundData, SERVER_URL } from '@/sites/utilities/hooks/use-apparound-data'
import Spinner from '@/components/Spinner'

const ContractSignature = () => {
   const navigate = useRelativeNavigate()
   const { t } = useTranslation() // Inizializza useTranslation
   const [iframeLoaded, setIframeLoaded] = useState(false)
   return (
      <div className="min-h-screen flex flex-col justify-center max-h-screen overflow-hidden">
         <Header step={3} />
         <MainContainer>
            <div className="container flex flex-col items-center justify-center gap-5 flex-1 h-full">
               <div>
                  <Title textKey={t('Firma contratto')} />
               </div>
               <div>
                  <h2 className="text-xl font-bold">{t('Leggi il contratto e procedi in fondo con la firma')}</h2>
               </div>
               <Card className="w-full flex-1 relative">
                  {!iframeLoaded ? <Spinner /> : null}
                  <iframe
                     onLoad={() => setIframeLoaded(true)}
                     src={`${SERVER_URL}/apparoundimages/v2/quote/${new ApparoundData().getQuoteId()}/pdf`}
                     className="min-h-[760px]"
                     width="100%"
                     height="100%"
                  ></iframe>
               </Card>
               <hr className="w-full mt-5" />
               <div className="text-center">
                  <Button
                     onClick={() => navigate('/contract-signature-close')}
                     className="bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all uppercase"
                  >
                     {t('Firma contratto')}
                  </Button>
               </div>
            </div>
         </MainContainer>
         <Footer />
      </div>
   )
}

export default ContractSignature
