import { useSelector, useDispatch } from 'react-redux'
import { selectTofList, selectTree } from '@/sites/retail/features/quoteSlice'
import { getProductsFromTof } from '@/sites/telco/hooks/apparoundData'
import CustomerCard from './CustomerCard'
import { Skeleton } from '@/components/ui/skeleton'
import ImmaginePrivato from '@/sites/telco/assets/images/privato.png'
import ImmagineBusiness from '@/sites/telco/assets/images/business.png'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const Offers = ({ isLoading }) => {
   const dispatch = useDispatch()
   const tofList = useSelector(selectTofList)
   const { t } = useTranslation()
   const navigate = useNavigate()

   if (isLoading) {
      return (
         <section className="py-20 px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">
               {t('Scopri le offerte pensate per te')}
            </h2>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
               {[...Array(2)].map((_, index) => (
                  <div key={index} className="flex flex-col items-center p-4">
                     <Skeleton className="h-40 w-full mb-4" />
                     <Skeleton className="h-6 w-3/4" />
                  </div>
               ))}
            </div>
         </section>
      )
   }

   if (!tofList || tofList.length === 0) {
      return (
         <section className="py-20 px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">
               {t('Scopri le offerte pensate per te')}
            </h2>
            <div className="max-w-6xl mx-auto text-center">
               <p className="text-xl text-gray-600">{t('no_offers_available')}</p>
            </div>
         </section>
      )
   }

   return (
      <section className="py-20 px-4">
         <h2 className="text-3xl font-bold text-center text-primary mb-12">{t('Scopri le offerte pensate per te')}</h2>
         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
            {tofList.map(item => (
               <CustomerCard
                  key={item.id}
                  imageSrc={item.name.toLowerCase() === 'business' ? ImmagineBusiness : ImmaginePrivato}
                  altText={item.name}
                  title={item.name.toUpperCase()}
                  onClick={async () => {
                     await getProductsFromTof(dispatch, item.id)
                     navigate(`/telco/configure-offer`)
                  }}
               />
            ))}
         </div>
      </section>
   )
}

export default Offers
