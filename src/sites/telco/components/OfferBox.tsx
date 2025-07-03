import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Button from '@/sites/retail/components/Button'
import { useTranslation } from 'react-i18next'

interface OfferPriceBoxProps {
   activationPrice: string
   monthlyPrice: string
   onActivate?: () => void
}

export const PriceBox: React.FC<{ label: string; price: string; isMobile: boolean; labelLeftPriceRight?: boolean }> = ({
   label,
   price,
   isMobile,
   labelLeftPriceRight,
}) => {
   const [intPart, decPart] = price.split(',')
   const decimals = decPart !== undefined ? decPart.padEnd(2, '0') : '00'
   const { t } = useTranslation()

   if (labelLeftPriceRight) {
      return (
         <div
            className={`min-w-[120px] flex flex-row items-end justify-between ${
               isMobile ? 'text-center' : 'text-left'
            }`}
         >
            <div className={`font-bold ${isMobile ? 'text-base' : 'text-2xl'} mr-2 self-end`}>{t(label)}</div>
            <div className={`font-bold ${isMobile ? 'text-2xl' : 'text-5xl'} leading-none`}>
               {intPart}
               <span className={`font-normal ${isMobile ? 'text-lg' : 'text-2xl'}`}>,{decimals} €</span>
            </div>
         </div>
      )
   }

   return (
      <div className={`min-w-[120px] ${isMobile ? 'text-center' : 'text-left'}`}>
         <div className={`font-bold ${isMobile ? 'text-base' : 'text-2xl'} ${isMobile ? 'text-center' : ''}`}>
            {label}
         </div>
         <div
            className={`font-bold ${isMobile ? 'text-2xl' : 'text-5xl'} leading-none ${isMobile ? 'text-center' : ''}`}
         >
            {intPart}
            <span className={`font-normal ${isMobile ? 'text-lg' : 'text-2xl'} ${isMobile ? 'text-center' : ''}`}>
               ,{decimals} €
            </span>
         </div>
      </div>
   )
}

export const OfferPriceBox: React.FC<OfferPriceBoxProps> = ({ activationPrice, monthlyPrice, onActivate }) => {
   const isMobile = useMediaQuery({ maxWidth: 767 })
   const { t } = useTranslation()
   return (
      <div
         className={`bg-[#eae6f0] ${isMobile ? 'py-6 px-3' : 'py-8'} flex items-center justify-center rounded-none ${
            isMobile ? 'my-4' : 'my-8'
         }`}
      >
         <div
            className={`max-w-[650px] min-w-[350px] flex ${
               isMobile ? 'flex-col' : 'flex-row'
            } items-center justify-between`}
         >
            <div
               className={`flex flex-1 ${isMobile ? 'justify-between' : 'justify-start'} items-center ${
                  isMobile ? 'gap-0' : 'gap-20'
               }`}
            >
               <PriceBox label={t('Attivazione')} price={activationPrice} isMobile={isMobile} />
               <PriceBox label={t('Al mese')} price={monthlyPrice} isMobile={isMobile} />
            </div>
            <div className={isMobile ? 'w-full mt-4' : 'ml-8 w-1/4'}>
               <Button
                  className="w-full min-w-[150px] bg-primary hover:bg-purple-700 rounded-3xl"
                  label={t('Attiva ora').toUpperCase()}
                  onClick={onActivate}
               />
            </div>
         </div>
      </div>
   )
}

export default OfferPriceBox
