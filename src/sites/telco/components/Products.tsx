import CheckCoverage from '@/sites/telco/components/CheckCoverage/CheckCoverage'
import ProductSwitch from '@/sites/telco/components/ProductSwitch'
import ProductIcon from '@/sites/telco/components/ProductIcon'
import SimSwitch from '@/sites/telco/components/SimSwitch'
import { useState, useEffect } from 'react'
import { setProductQuantity } from '@/sites/telco/hooks/apparoundData'
import { deleteProduct } from '@/sites/telco/hooks/apparoundData'
import { useTranslation } from 'react-i18next'

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
   const { t } = useTranslation()
   const [simValues, setSimValues] = useState<{ [key: string]: number }>({})
   let hasCheckCoverage = products.some(product => product.description === 'Verifica copertura')
   const [discoverEnabled, setDiscoverEnabled] = useState(!hasCheckCoverage)

   useEffect(() => {
      if (products.some(product => product.description === 'Verifica copertura')) {
         setDiscoverEnabled(false)
      }
   }, [products])

   const handleCoverageResponse = (response: any) => {
      if (response && response.message === 'Copertura disponibile per il tuo indirizzo!') {
         setDiscoverEnabled(true)
      } else {
         setDiscoverEnabled(false)
      }
   }

   if (!products || products.length === 0) return null

   return (
      <div className="space-y-4 mb-8 flex flex-col items-center gap-4">
         {products.map(product => {
            if (product.description === 'Verifica copertura') {
               return <CheckCoverage key={product.guid} onCoverageResponse={handleCoverageResponse} />
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
                        } else {
                           deleteProduct(product.guid, dispatch)
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
         <button
            type="button"
            className="w-[60%] mt-6 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-3xl shadow transition-all disabled:opacity-50"
            onClick={() => window.location.assign('/telco/offerta-home')}
            disabled={!discoverEnabled}
         >
            {t('Scopri le offerte').toUpperCase()}
         </button>
         {hasCheckCoverage && !discoverEnabled && (
            <div className="text-red-600 text-sm mt-2 text-center">
               {t('Compila il form di verifica copertura per proseguire')}
            </div>
         )}
      </div>
   )
}

export default Products
