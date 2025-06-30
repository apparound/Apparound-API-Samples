import React from 'react'
import { Card } from '@/components/ui/card'
import ProductRow from './ProductRow'
import { addProduct } from '@/sites/telco/hooks/apparoundData'
import { useDispatch, useSelector } from 'react-redux'
import { selectContractProperties, selectTofId } from '@/sites/retail/features/quoteSlice'
import FiberTechnology from '../CheckCoverage/FiberTechnology'
import { useTranslation } from 'react-i18next'

interface ProductListProps {
   products: any[]
   onAdd: (product: any) => void
   onRemove: (product: any) => void
   cart: any
   includedProducts?: string[]
   cluster?: any
   loadingMap?: { [guid: string]: boolean }
}

const ProductList: React.FC<ProductListProps> = ({
   products,
   onAdd,
   onRemove,
   cart,
   includedProducts,
   cluster,
   loadingMap,
}) => {
   const contractProperties = useSelector(selectContractProperties)
   const { t } = useTranslation()

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
               includedProducts={includedProducts}
               loading={!!loadingMap?.[product.guid]}
            />
         ))}

         {cluster?.label === t('Carrello') && contractProperties?.addressContract_address && (
            <>
               <div className="font-bold text-lg text-gray-800 mt-8 mb-3 flex items-center">{t('Copertura')}</div>
               <div className="font-medium text-sm text-left text-gray-900 mb-2">
                  {contractProperties?.addressContract_address}, {contractProperties?.addressContract_zipCode}{' '}
                  {contractProperties?.addressContract_city} ({contractProperties?.addressContract_province})
               </div>
               <FiberTechnology />
            </>
         )}
      </>
   )
}

interface AddonClusterProps {
   cluster: any
   includedProducts?: string[]
}

function cartContainsGuid(cartObj: any, guid: string): boolean {
   if (!cartObj || typeof cartObj !== 'object') return false
   if (cartObj[guid]) return true
   return Object.values(cartObj).some(value => cartContainsGuid(value, guid))
}

const AddonCluster: React.FC<AddonClusterProps> = ({ cluster, includedProducts }) => {
   const dispatch = useDispatch()
   const tofId = useSelector(selectTofId)
   const cart = useSelector((state: any) => state.quote.cart)
   const [loadingMap, setLoadingMap] = React.useState<{ [guid: string]: boolean }>({})

   const handleAddProduct = async (product: any) => {
      setLoadingMap(prev => ({ ...prev, [product.guid]: true }))
      try {
         await addProduct(product.guid, dispatch, tofId, product.parentGuid)
      } finally {
         setLoadingMap(prev => ({ ...prev, [product.guid]: false }))
      }
   }

   const handleRemoveProduct = async (product: any) => {
      setLoadingMap(prev => ({ ...prev, [product.guid]: true }))
      try {
         const { deleteProduct } = await import('@/sites/telco/hooks/apparoundData')
         await deleteProduct(product.guid, dispatch)
      } finally {
         setLoadingMap(prev => ({ ...prev, [product.guid]: false }))
      }
   }

   return (
      <Card className="bg-white rounded-2xl !shadow-kiki-shadow p-6">
         <div className="font-bold text-lg text-gray-800 mb-3 flex items-center">{cluster.label}</div>
         <div>
            <ProductList
               products={cluster.products}
               onAdd={handleAddProduct}
               onRemove={handleRemoveProduct}
               cart={cart}
               includedProducts={includedProducts}
               cluster={cluster}
               loadingMap={loadingMap}
            />
         </div>
      </Card>
   )
}

export default AddonCluster
