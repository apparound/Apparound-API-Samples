import CheckCoverage from '@/sites/telco/components/CheckCoverage/CheckCoverage'
import ProductSwitch from '@/sites/telco/components/ProductSwitch'

interface ProductsProps {
   products: any[]
   switchStates: { [key: string]: boolean }
   setSwitchStates: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
}

const Products: React.FC<ProductsProps> = ({ products, switchStates, setSwitchStates }) => {
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
                  onChange={() =>
                     setSwitchStates(prev => ({
                        ...prev,
                        [product.guid]: !prev[product.guid],
                     }))
                  }
               />
            )
         )}
      </div>
   )
}

export default Products
