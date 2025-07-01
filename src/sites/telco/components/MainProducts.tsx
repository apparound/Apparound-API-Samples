import OfferCard from '@/sites/telco/components/Offers/OfferCard'
import { getImageUrl } from '@/utils/utils'
import { useToast } from '@/hooks/use-toast'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { selectTofId } from '@/sites/retail/features/quoteSlice'

interface MainProductsProps {
   startingProducts: any[]
   selectedOfferGuid: string | null
   setSelectedOfferGuid: (guid: string) => void
   addProduct: (guid: string, dispatch: any, tofId: any) => Promise<void>
   addingProductGuid: string | null
   setAddingProductGuid: (guid: string | null) => void
}

const MainProducts: React.FC<MainProductsProps> = ({
   startingProducts,
   selectedOfferGuid,
   setSelectedOfferGuid,
   addProduct,
   addingProductGuid,
   setAddingProductGuid,
}) => {
   const { toast } = useToast()
   const { t } = useTranslation()
   const tofId = useSelector(selectTofId)
   const dispatch = useDispatch()

   const handleProductClick = async (productGuid: string) => {
      try {
         await addProduct(productGuid, dispatch, tofId)
         setSelectedOfferGuid(productGuid)
         setAddingProductGuid(productGuid)
      } catch (error) {
         console.error("Errore durante l'aggiunta del prodotto:", error)
         toast({
            title: t('Errore'),
            description: t('product_add_error'),
            variant: 'destructive',
         })
      } finally {
         setAddingProductGuid(null)
      }
   }

   return (
      <div className="flex flex-wrap gap-8 mb-12 justify-center">
         {startingProducts.map(product => (
            <OfferCard
               key={product.guid}
               imageSrc={getImageUrl(product.icon)}
               title={product.description}
               selected={selectedOfferGuid === product.guid}
               loading={addingProductGuid === product.guid}
               onClick={() => handleProductClick(product.guid)}
            />
         ))}
      </div>
   )
}

export default MainProducts
