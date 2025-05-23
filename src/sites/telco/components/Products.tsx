import CheckCoverage from '@/sites/telco/components/CheckCoverage/CheckCoverage'
import ProductSwitch from '@/sites/telco/components/ProductSwitch'
import ProductIcon from '@/sites/telco/components/ProductIcon'

interface ProductsProps {
   products: any[]
   switchStates: { [key: string]: boolean }
   setSwitchStates: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
   addProduct: (guid: string, dispatch: any, tofId: any, parentGuid: string) => Promise<void>
   dispatch: any
   tofId: any
   parentGuid: string
}

const Products: React.FC<ProductsProps> = ({
   products,
   switchStates,
   setSwitchStates,
   addProduct,
   dispatch,
   tofId,
   parentGuid,
}) => {
   if (!products || products.length === 0) return null

   return (
      <div className="space-y-4 mb-8 flex flex-col items-center gap-4">
         {products.map(product =>
            product.description === 'Verifica copertura' ? (
               <CheckCoverage key={product.guid} />
            ) : (
               <ProductSwitch
                  key={product.guid}
                  description={product.description}
                  checked={!!switchStates[product.guid]}
                  onChange={async () => {
                     setSwitchStates(prev => {
                        const newState = !prev[product.guid]
                        if (newState) {
                           addProduct(product.guid, dispatch, tofId, parentGuid)
                        }
                        return {
                           ...prev,
                           [product.guid]: newState,
                        }
                     })
                  }}
                  icon={ProductIcon.get(product.description.toLowerCase())}
               />
            )
         )}
      </div>
   )
}

export default Products
