import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { currencyNumberFormat, getPdfUrl } from '@/utils/utils'
import { selectQuote, selectQuotePrice } from '@/sites/retail/features/quoteSlice'
import Button from '@/sites/retail/components/Button'
import { mdiFileDocument } from '@mdi/js'

const Footer = () => {
   const { t } = useTranslation()
   const quotePrice = useSelector(selectQuotePrice)
   const quote = useSelector(selectQuote)
   return (
      <div className="border-t-[3px] border-primary bg-[#f4f4f4] flex justify-end p-4 text-left">
         {quote.quoteNumber ? (
            <div className="flex-1">
               <Button
                  label={t('Vedi dettaglio configurazione')}
                  onClick={() => {
                     window.open(getPdfUrl(), '_blank')
                  }}
                  variant={5}
                  leftIcon={{
                     path: mdiFileDocument,
                     size: '30px',
                  }}
               />
            </div>
         ) : null}
         <div className="flex gap-1 text-lg">
            <div className="italic">{t('Totale')}:</div>
            <div className="font-bold">{currencyNumberFormat(quotePrice)}</div>
         </div>
      </div>
   )
}

export default Footer
