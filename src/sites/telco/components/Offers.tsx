import { useSelector, useDispatch } from 'react-redux'
import { selectTofList, selectTree } from '@/sites/retail/features/quoteSlice'
import { getProductsFromTof } from '@/sites/telco/hooks/apparoundData'
import CustomerCard from './CustomerCard'
import { Skeleton } from '@/components/ui/skeleton'
import ImmaginePrivato from '@/sites/telco/assets/images/privato.png'
import ImmagineBusiness from '@/sites/telco/assets/images/business.png'

const Offers = ({ onNavigate, isLoading }) => {
   const dispatch = useDispatch()
   const tofList = useSelector(selectTofList)

   if (isLoading) {
      return (
         <section className="py-20 px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">Scopri le offerte pensate per te</h2>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
               {[...Array(2)].map((_, index) => (
                  <div key={index} className="flex flex-col items-center p-4">
                     <Skeleton className="h-40 w-full mb-4" /> {/* Placeholder immagine */}
                     <Skeleton className="h-6 w-3/4" /> {/* Placeholder titolo */}
                  </div>
               ))}
            </div>
         </section>
      )
   }

   if (!tofList || tofList.length === 0) {
      return null
   }

   return (
      <section className="py-20 px-4">
         <h2 className="text-3xl font-bold text-center text-primary mb-12">Scopri le offerte pensate per te</h2>
         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
            {tofList.map(item => (
               <CustomerCard
                  key={item.id}
                  imageSrc={item.name.toLowerCase() === 'privato' ? ImmaginePrivato : ImmagineBusiness}
                  altText={item.name}
                  title={item.name.toUpperCase()}
                  onClick={async () => {
                     await getProductsFromTof(dispatch, item.id)
                     onNavigate(`/telco/${item.name.toLowerCase()}`)
                  }}
               />
            ))}
         </div>
      </section>
   )
}

export default Offers
