import { useEffect, useState } from 'react'
import { ApparoundData } from '@/hooks/use-apparound-data'
import OfferCard from '@/sites/telco/components/Offers/OfferCard'
import { getImageUrl } from '@/utils/utils'

interface MainProductsProps {
   startingProducts: any[]
   selectedOfferGuid: string | null
   setSelectedOfferGuid: (guid: string) => void
   addProduct: (guid: string, dispatch: any, tofId: any) => Promise<void>
   dispatch: any
   tofId: any
   addingProductGuid: string | null
   setAddingProductGuid: (guid: string | null) => void
}

const MainProducts: React.FC<MainProductsProps> = ({
   startingProducts,
   selectedOfferGuid,
   setSelectedOfferGuid,
   addProduct,
   dispatch,
   tofId,
   addingProductGuid,
   setAddingProductGuid,
}) => {
   return (
      <div className="flex flex-wrap gap-8 mb-12 justify-center">
         {startingProducts.map(product => (
            <OfferCard
               key={product.guid}
               imageSrc={getImageUrl(product.icon)}
               title={product.description}
               selected={selectedOfferGuid === product.guid}
               loading={addingProductGuid === product.guid}
               onClick={async () => {
                  setSelectedOfferGuid(product.guid)
                  setAddingProductGuid(product.guid)
                  try {
                     await addProduct(product.guid, dispatch, tofId)
                  } finally {
                     setAddingProductGuid(null)
                  }
               }}
            />
         ))}
      </div>
   )
}

export default MainProducts
