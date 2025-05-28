import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Button from '@/sites/retail/components/Button'

interface OfferPriceBoxProps {
   activationPrice: string
   monthlyPrice: string
   onActivate?: () => void
}

const PriceBox: React.FC<{ label: string; price: string; isMobile: boolean }> = ({ label, price, isMobile }) => (
   <div className={`min-w-[120px] ${isMobile ? 'text-center' : 'text-left'}`}>
      <div className={`font-bold ${isMobile ? 'text-base' : 'text-2xl'} ${isMobile ? 'text-center' : ''}`}>{label}</div>
      <div className={`font-bold ${isMobile ? 'text-2xl' : 'text-5xl'} leading-none ${isMobile ? 'text-center' : ''}`}>
         {price.split(',')[0]}
         <span className={`font-normal ${isMobile ? 'text-lg' : 'text-2xl'} ${isMobile ? 'text-center' : ''}`}>
            ,{price.split(',')[1]} €
         </span>
      </div>
   </div>
)

const OfferPriceBox: React.FC<OfferPriceBoxProps> = ({ activationPrice, monthlyPrice, onActivate }) => {
   const isMobile = useMediaQuery({ maxWidth: 767 })
   return (
      <div
         className={`bg-[#eae6f0] ${isMobile ? 'py-6 px-3' : 'py-8'} flex items-center justify-center rounded-none ${
            isMobile ? 'my-4' : 'my-8'
         }`}
      >
         <div className={`w-[60vw] flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-between`}>
            <div
               className={`flex flex-1 ${isMobile ? 'justify-between' : 'justify-start'} items-center ${
                  isMobile ? 'gap-0' : 'gap-20'
               }`}
            >
               <PriceBox label="Attivazione" price={activationPrice} isMobile={isMobile} />
               <PriceBox label="Al mese" price={monthlyPrice} isMobile={isMobile} />
            </div>
            <div className={isMobile ? 'w-full mt-4' : 'ml-8 w-1/4'}>
               <Button
                  className="w-full bg-primary hover:bg-purple-700 rounded-3xl"
                  label="ATTIVA ORA"
                  onClick={onActivate}
               />
            </div>
         </div>
      </div>
   )
}

export default OfferPriceBox
