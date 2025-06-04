import React from 'react'
import { Card } from '@/components/ui/card'
import cardHeader from '@/sites/telco/assets/misc/cardHeader.png'
import { Button } from '@/components/ui/button'
import { PriceBox } from '../OfferBox'
import { useSelector } from 'react-redux'
import { selectQuoteMontlyPrice, selectQuotePrice } from '@/sites/retail/features/quoteSlice'
import { useMediaQuery } from 'react-responsive'

interface RiepilogoProps {
   className?: string
   children?: React.ReactNode
}

const Riepilogo = ({ className = '', children }: RiepilogoProps) => {
   const quotePrice = useSelector(selectQuotePrice)
   const quoteMonthlyPrice = useSelector(selectQuoteMontlyPrice)
   const isMobile = useMediaQuery({ maxWidth: 767 })

   return (
      <Card className={`bg-white rounded-2xl shadow-lg border border-gray-200 ${className}`}>
         <div className="relative">
            <img src={cardHeader} alt="Decorazione" className="w-full h-18 object-cover" />
            <h3 className="absolute top-2 left-0 w-full flex items-start justify-center text-2xl font-bold text-white drop-shadow-lg mt-2">
               {'Riepilogo'}
            </h3>
         </div>
         {children ? children : <div className="text-gray-500">Nessun dato disponibile</div>}

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
            className="mx-2 my-4"
            onClick={() => {
               console.log("Procedi con l'ordine")
            }}
         >
            Procedi con l'ordine
         </Button>
      </Card>
   )
}

export default Riepilogo
