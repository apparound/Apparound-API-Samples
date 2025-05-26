import CheckCoverage from '@/sites/telco/components/CheckCoverage/CheckCoverage'
import ProductSwitch from '@/sites/telco/components/ProductSwitch'
import ProductIcon from '@/sites/telco/components/ProductIcon'
import SimSwitch from '@/sites/telco/components/SimSwitch'
import { useState } from 'react'
import { setProductQuantity } from '@/sites/telco/hooks/apparoundData'

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
   const [simValues, setSimValues] = useState<{ [key: string]: number }>({})

   if (!products || products.length === 0) return null

   return (
      <div className="space-y-4 mb-8 flex flex-col items-center gap-4">
         {products.map(product => {
            if (product.description === 'Verifica copertura') {
               return <CheckCoverage key={product.guid} />
            }
            if (product.description.toLowerCase() === 'sim/esim') {
               return (
                  <SimSwitch
                     key={product.guid}
                     description={product.description}
                     value={simValues[product.guid] || 0}
                     onChange={async val => {
                        const prevVal = simValues[product.guid] || 0
                        setSimValues(prev => ({ ...prev, [product.guid]: val }))
                        if (prevVal === 0 && val > 0) {
                           await addProduct(product.guid, dispatch, tofId, parentGuid)
                        }
                        if (val > 0) {
                           await setProductQuantity(product.guid, val, dispatch)
                        }
                     }}
                     icon={ProductIcon.get(product.description.toLowerCase())}
                  />
               )
            }
            return (
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
         })}
      </div>
   )
}

export default Products
