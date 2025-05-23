import OfferCard from '@/sites/telco/components/Offers/OfferCard'

interface MainProductsProps {
   startingProducts: any[]
   selectedOfferGuid: string | null
   setSelectedOfferGuid: (guid: string) => void
   addProduct: (guid: string, dispatch: any, tofId: any) => Promise<void>
   dispatch: any
   tofId: any
}

const MainProducts: React.FC<MainProductsProps> = ({
   startingProducts,
   selectedOfferGuid,
   setSelectedOfferGuid,
   addProduct,
   dispatch,
   tofId,
}) => (
   <div className="flex flex-wrap gap-8 mb-12 justify-center">
      {startingProducts.map(product => (
         <OfferCard
            key={product.guid}
            imageSrc={'/src/sites/telco/assets/images/default.png'}
            title={product.description}
            selected={selectedOfferGuid === product.guid}
            onClick={async () => {
               setSelectedOfferGuid(product.guid)
               await addProduct(product.guid, dispatch, tofId)
            }}
         />
      ))}
   </div>
)

export default MainProducts
