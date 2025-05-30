import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import cardHeader from '@/sites/telco/assets/misc/cardHeader.png'
import { useTranslation } from 'react-i18next'
import { addProduct } from '@/sites/telco/hooks/apparoundData'
import { useDispatch, useSelector } from 'react-redux'
import { selectTofId } from '@/sites/retail/features/quoteSlice'

const OfferFullCards = ({ products, navigate }) => {
   const { t } = useTranslation()
   const dispatch = useDispatch()
   const tofId = useSelector(selectTofId)

   function getDetailsList(product, lang) {
      if (product.features && product.features.length > 0) {
         return product.features.map((feature, i) => ({ key: i, value: feature }))
      } else if (product.config && product.config.details) {
         let detailsArr = []
         try {
            detailsArr = JSON.parse(product.config.details)
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
      <div className="grid md:grid-cols-3 gap-8 mb-12">
         {products.map((product, idx) => (
            <Card key={product.guid || idx} className="relative overflow-hidden rounded-3xl">
               <div className="relative">
                  <img src={cardHeader} alt="Decorazione" className="w-full h-18 object-cover" />
                  <h3 className="absolute top-0 left-0 w-full flex items-start justify-center text-xl font-bold text-white drop-shadow-lg mt-2">
                     {product.productName || product.label}
                  </h3>
               </div>
               <div className="p-6 pt-2">
                  <ul className="space-y-4 mb-8 text-left">
                     {getDetailsList(product, t('en') || 'it').map(({ key, value }) => (
                        <li className="flex items-center" key={key}>
                           <Check className="text-primary mr-2" />
                           <span>{value}</span>
                        </li>
                     ))}
                  </ul>
                  <div className="text-center mb-6">
                     <div className="text-sm text-gray-600">A partire da</div>
                     <div className="text-3xl font-bold text-primary">
                        {product.price ? `${product.price} €` : '--'}{' '}
                        <span className="text-sm font-normal">al mese</span>
                     </div>
                  </div>
                  <Button
                     className="w-full bg-primary hover:bg-purple-700 rounded-3xl"
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
