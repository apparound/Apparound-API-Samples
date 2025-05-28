import React from 'react'
import { Card } from '@/components/ui/card'
import ProductRow from './ProductRow'

interface ProductListProps {
   products: any[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
   if (!products || products.length === 0) {
      return <div className="text-gray-400 italic">Nessun prodotto</div>
   }
   return (
      <>
         {products.map((product, idx) => (
            <ProductRow key={product.guid} product={product} isLast={idx === products.length - 1} />
         ))}
      </>
   )
}

interface AddonClusterProps {
   cluster: any
}

const AddonCluster: React.FC<AddonClusterProps> = ({ cluster }) => (
   <Card className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <div className="font-bold text-lg text-gray-800 mb-3 flex items-center">{cluster.label}</div>
      <div>
         <ProductList products={cluster.products} />
      </div>
   </Card>
)

export default AddonCluster
