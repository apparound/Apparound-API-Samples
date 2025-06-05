import React from 'react'
import { Card } from '@/components/ui/card'
import cardHeader from '@/sites/telco/assets/misc/cardHeader.png'
import { Button } from '@/components/ui/button'
import { PriceBox } from '../OfferBox'
import { useSelector } from 'react-redux'
import { selectQuoteMontlyPrice, selectQuotePrice } from '@/sites/retail/features/quoteSlice'
import { useMediaQuery } from 'react-responsive'
import RecapProductList from './RecapProductList'
import { useTranslation } from 'react-i18next'

interface RecapProps {
   className?: string
   children?: React.ReactNode
}

const Recap = ({ className = '', children }: RecapProps) => {
   const quotePrice = useSelector(selectQuotePrice)
   const quoteMonthlyPrice = useSelector(selectQuoteMontlyPrice)
   const isMobile = useMediaQuery({ maxWidth: 767 })
   const { t } = useTranslation()

   return (
      <Card className={`bg-white rounded-2xl shadow-lg border border-gray-200 ${className}`}>
         <div className="relative">
            <img src={cardHeader} alt="Decorazione" className="w-full h-18 object-cover" />
            <h3 className="absolute top-2 left-0 w-full flex items-start justify-center text-2xl font-bold text-white drop-shadow-lg mt-2">
               {'Riepilogo'}
            </h3>
         </div>

         <RecapProductList />
         <div className="bg-primary/20 p-6">
            <PriceBox
               label="Attivazione"
               price={quotePrice.toString()}
               isMobile={isMobile}
               labelLeftPriceRight={true}
            />
            <PriceBox
               label="Al mese"
               price={quoteMonthlyPrice.toString()}
               isMobile={isMobile}
               labelLeftPriceRight={true}
            />
         </div>

         <Button
            className="mx-4 my-4 w-[80%] bg-white border-2 border-primary text-primary hover:bg-purple-700 hover:text-white rounded-3xl px-6"
            onClick={() => {
               console.log("Procedi con l'ordine")
            }}
         >
            {t('Visualizza PDF Offerta').toUpperCase()}
         </Button>
      </Card>
   )
}

export default Recap
