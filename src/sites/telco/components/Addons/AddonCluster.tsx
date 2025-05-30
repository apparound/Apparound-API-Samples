import React from 'react'
import { Card } from '@/components/ui/card'
import ProductRow from './ProductRow'
import { addProduct } from '@/sites/telco/hooks/apparoundData'
import { useDispatch, useSelector } from 'react-redux'
import { selectTofId } from '@/sites/retail/features/quoteSlice'

interface ProductListProps {
   products: any[]
   onAdd: (product: any) => void
   onRemove: (product: any) => void
   cart: any
}

const ProductList: React.FC<ProductListProps> = ({ products, onAdd, onRemove, cart }) => {
   if (!products || products.length === 0) {
      return <div className="text-gray-400 italic">Nessun prodotto</div>
   }
   return (
      <>
         {products.map((product, idx) => (
            <ProductRow
               key={product.guid}
               product={product}
               isLast={idx === products.length - 1}
               onAdd={onAdd}
               onRemove={onRemove}
               added={cartContainsGuid(cart, product.guid)}
            />
         ))}
      </>
   )
}

interface AddonClusterProps {
   cluster: any
}

function cartContainsGuid(cartObj: any, guid: string): boolean {
   if (!cartObj || typeof cartObj !== 'object') return false
   if (cartObj[guid]) return true
   return Object.values(cartObj).some(value => cartContainsGuid(value, guid))
}

const AddonCluster: React.FC<AddonClusterProps> = ({ cluster }) => {
   const dispatch = useDispatch()
   const tofId = useSelector(selectTofId)
   const cart = useSelector((state: any) => state.quote.cart)

   const handleAddProduct = async (product: any) => {
      await addProduct(product.guid, dispatch, tofId, product.parentGuid)
   }

   const handleRemoveProduct = async (product: any) => {
      const { deleteProduct } = await import('@/sites/telco/hooks/apparoundData')
      await deleteProduct(product.guid, dispatch)
   }

   return (
      <Card className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
         <div className="font-bold text-lg text-gray-800 mb-3 flex items-center">{cluster.label}</div>
         <div>
            <ProductList
               products={cluster.products}
               onAdd={handleAddProduct}
               onRemove={handleRemoveProduct}
               cart={cart}
            />
         </div>
      </Card>
   )
}

export default AddonCluster
