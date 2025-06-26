import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import cardHeader from '@/sites/telco/assets/misc/cardHeader.png'
import { useTranslation } from 'react-i18next'
import { addProduct } from '@/sites/telco/hooks/apparoundData'
import { useDispatch, useSelector } from 'react-redux'
import { selectTofId } from '@/sites/retail/features/quoteSlice'

const ProductPrice = ({ price }) => {
   const { t } = useTranslation()
   let intPart = '--',
      decPart = ''
   if (price) {
      const [int, dec] = price.toString().split(',')
      intPart = int
      decPart = ',' + (typeof dec !== 'undefined' ? dec.padEnd(2, '0') : '00')
   }
   return (
      <div className="w-full flex flex-col items-center mb-6 bg-primary/20 px-4 py-4">
         <div>
            <div className="text-base text-gray-600 mb-1 w-full text-left">{t('A partire da')}</div>
            <div className="flex items-end w-full">
               <span className="text-5xl font-bold text-black leading-none">{intPart}</span>
               <span className="text-2xl font-bold text-black leading-none mb-1">{decPart}</span>
               <span className="text-2xl font-bold text-black leading-none mb-1 ml-1">€</span>
               <span className="text-lg font-normal text-gray-600 ml-2">al mese</span>
            </div>
         </div>
      </div>
   )
}

const ProductDetailsList = ({ details }) => (
   <ul className="space-y-4 mb-8 text-left px-6">
      {details.map(({ key, value }) => (
         <li className="flex items-center" key={key}>
            <Check className="text-primary mr-2" />
            <span>{value}</span>
         </li>
      ))}
   </ul>
)

const ProductCardHeader = ({ image, title }) => (
   <div className="relative">
      <img src={image} alt="Decorazione" className="w-full h-18 object-cover" />
      <h3 className="absolute top-0 left-0 w-full flex items-start justify-center text-xl font-bold text-white drop-shadow-lg mt-2">
         {title}
      </h3>
   </div>
)

const OfferFullCards = ({ products, navigate }) => {
   const { t } = useTranslation()
   const dispatch = useDispatch()
   const tofId = useSelector(selectTofId)

   function getDetailsList(product, lang) {
      if (product.features && product.features.length > 0) {
         return product.features.map((feature, i) => ({ key: i, value: feature }))
      } else if (product.config && product.config.headlessDescription) {
         let detailsArr = []
         try {
            detailsArr = JSON.parse(product.config.headlessDescription)
         } catch (e) {
            detailsArr = []
         }
         if (Array.isArray(detailsArr) && detailsArr.length > 0) {
            return detailsArr.map((detail, i) => ({ key: i, value: detail[lang] || '' }))
         }
      }
      return [{ key: 0, value: 'Fibra ultraveloce' }]
   }

   return (
      <div className="flex flex-wrap gap-2 mb-12 justify-center">
         {products.map((product, idx) => (
            <Card
               key={product.guid || idx}
               className="relative overflow-hidden rounded-3xl min-w-0 max-w-[350px] w-full mx-auto"
            >
               <ProductCardHeader image={cardHeader} title={product.productName || product.label} />
               <div className="px-0 py-6">
                  <ProductDetailsList details={getDetailsList(product, t('en') || 'it')} />
                  <ProductPrice price={product.price} />
                  <Button
                     className="w-[80%] bg-primary hover:bg-purple-700 rounded-3xl px-6"
                     onClick={async () => {
                        await addProduct(product.guid, dispatch, tofId, product.parentGuid)
                        navigate('/telco/offer-detail', { state: { offer: product.productName || product.label } })
                     }}
                  >
                     {t('SCOPRI E ATTIVA')}
                  </Button>
               </div>
            </Card>
         ))}
      </div>
   )
}

export default OfferFullCards
