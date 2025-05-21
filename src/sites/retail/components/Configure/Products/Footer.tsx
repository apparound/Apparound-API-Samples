import React from 'react'
import Button from '@/sites/retail/components/Button'
import { useTranslation } from 'react-i18next'
import { currencyNumberFormat } from '@/utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, selectIsValid, selectQuotePrice } from '@/sites/retail/features/quoteSlice'
import useRelativeNavigate from '@/utils/navigate'

interface FooterPropsI {}

const Footer = ({}: FooterPropsI) => {
   const { t } = useTranslation()
   const dispatch = useDispatch()
   const navigate = useRelativeNavigate()
   const quotePrice = useSelector(selectQuotePrice)
   const isValid = useSelector(selectIsValid)
   const goToCart = () => {
      dispatch(addToCart())

      navigate('/cart')
   }
   return (
      <div className="flex flex-col gap-3 border-t-2 border-[#DCE1E6] p-3 -mt-[2px]">
         <div className="rounded text-left flex px-5 p-2 bg-[#E3E7E4]">
            <div className="flex-1 italic">{t('Totale')}</div>
            <div className="font-bold">{currencyNumberFormat(quotePrice)}</div>
         </div>
         <div className="flex gap-4">
            <div className="flex-1">
               <Button
                  onClick={goToCart}
                  disabled={!isValid}
                  label={t('Aggiungi al carrello')}
                  variant={1}
                  full={true}
               />
            </div>
         </div>
      </div>
   )
}

export default Footer
