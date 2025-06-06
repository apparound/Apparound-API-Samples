import React from 'react'
import { Card } from '@/components/ui/card'
import cardHeader from '@/sites/telco/assets/misc/cardHeader.png'
import { Button } from '@/components/ui/button'
import { PriceBox } from '../OfferBox'
import { useDispatch, useSelector } from 'react-redux'
import {
   selectContract,
   selectCustomer,
   selectQuoteMontlyPrice,
   selectQuotePrice,
   updateContractProperties, // aggiunto import
} from '@/sites/retail/features/quoteSlice'
import { useMediaQuery } from 'react-responsive'
import RecapProductList from './RecapProductList'
import { useTranslation } from 'react-i18next'
import { getPdfQuote, saveContract } from '../../hooks/apparoundData'
import { use } from 'i18next'

interface RecapProps {
   className?: string
   children?: React.ReactNode
}

const Recap = ({ className = '' }: RecapProps) => {
   const quotePrice = useSelector(selectQuotePrice)
   const quoteMonthlyPrice = useSelector(selectQuoteMontlyPrice)
   const isMobile = useMediaQuery({ maxWidth: 767 })
   const { t } = useTranslation()
   const dispatch = useDispatch()

   const contractData = useSelector(selectContract)
   const customerData = useSelector(selectCustomer)
   const sessionId = useSelector((state: any) => state.quote.sessionId)

   const viewOffer = async () => {
      // Mapping tra proprietà contratto e customer
      const mapping = {
         firstName: 'firstName',
         lastName: 'lastName',
         customEmailMandatory: 'email',
         customPhoneMandatory: 'customPhoneMandatory',
         addressContract_province: 'customAddress_province',
         addressContract_city: 'customAddress_city',
         addressContract_zipCode: 'customAddress_zipCode',
         addressContract_address: 'customAddress_address',
      }
      const propertiesToUpdate = Object.entries(mapping).reduce((acc, [contractKey, customerKey]) => {
         if (customerData && customerData[customerKey] !== undefined) {
            acc[contractKey] = customerData[customerKey]
         }
         return acc
      }, {})
      if (Object.keys(propertiesToUpdate).length > 0) {
         dispatch(updateContractProperties(propertiesToUpdate))
      }

      await saveContract(contractData, customerData, dispatch)
      getPdfQuote(sessionId)
   }

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
               viewOffer()
            }}
         >
            {t('Visualizza PDF Offerta').toUpperCase()}
         </Button>
      </Card>
   )
}

export default Recap
