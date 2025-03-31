import React from 'react'
import Header from '@/sites/utilities/components/custom/Header'
import Footer from '@/components/Footer'
import Title from '@/sites/utilities/components/custom/texts/Title'
import MainContainer from '@/sites/utilities/components/custom/MainContainer'
import Offer from '@/sites/utilities/components/custom/CartSignature/Offer'
import { useTranslation } from 'react-i18next'
import ContrattoFirmato from '@/sites/utilities/assets/images/contratto-firmato.svg'
import Contract from '@/sites/utilities/components/custom/CartSignature/Contract/Contract'

const ContractClose = () => {
   const { t } = useTranslation() // Inizializza useTranslation
   return (
      <div className="min-h-screen flex flex-col justify-center max-h-screen overflow-hidden">
         <Header step={4} />
         <MainContainer>
            <div className="container flex flex-col items-center justify-center gap-10 h-full">
               <div className="p-5 lg:w-2/4 rounded-lg shadow-1app bg-[#e8efdb] flex flex-row justify-center items-center gap-3">
                  <div className="[&>svg]:w-auto [&>svg]:h-20">
                     <ContrattoFirmato />
                  </div>
                  <div className="font-bold text-2xl">{t('Contratto firmato!')}</div>
               </div>
               <div>
                  <Title textKey={t('Il tuo riepilogo')} />
               </div>
               <div>
                  <h2 className="text-2xl font-bold">{t('Offerta')}</h2>
               </div>
               <Offer />
               <div>
                  <h2 className="text-2xl font-bold">{t('Dati contratto')}</h2>
               </div>
               <Contract />
            </div>
         </MainContainer>
         <Footer />
      </div>
   )
}

export default ContractClose
