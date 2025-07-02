import CheckCoverage from '@/sites/telco/components/CheckCoverage/CheckCoverage'
import ProductSwitch from '@/sites/telco/components/ProductSwitch'
import ProductIcon from '@/sites/telco/components/ProductIcon'
import QuantitySwitch from '@/sites/telco/components/QuantitySwitch'
import { useState, useEffect } from 'react'
import { deleteProduct } from '@/sites/telco/hooks/apparoundData'
import { useTranslation } from 'react-i18next'
import { selectTofId } from '@/sites/retail/features/quoteSlice'
import { useSelector } from 'react-redux'

interface ProductsProps {
   products: any[]
   switchStates: { [key: string]: boolean }
   setSwitchStates: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
   addProduct: (guid: string, dispatch: any, tofId: any, parentGuid: string) => Promise<void>
   dispatch: any
   parentGuid: string
}

// Funzione helper per verificare se un prodotto è di tipo "Check Coverage"
const isCheckCoverageProduct = (product: any): boolean => {
   return product.description === 'Verifica copertura' || product.description === 'Coverage check'
}

const Products: React.FC<ProductsProps> = ({
   products,
   switchStates,
   setSwitchStates,
   addProduct,
   dispatch,
   parentGuid,
}) => {
   const { t } = useTranslation()
   const [simValues, setSimValues] = useState<{ [key: string]: number }>({})
   let hasCheckCoverage = products.some(isCheckCoverageProduct)
   const [discoverEnabled, setDiscoverEnabled] = useState(!hasCheckCoverage)
   const tofId = useSelector(selectTofId)

   useEffect(() => {
      const check = products.some(isCheckCoverageProduct)
      setDiscoverEnabled(!check)
   }, [products])

   const handleCoverageResponse = (response: any) => {
      const check = response && response.message === 'Copertura disponibile per il tuo indirizzo!'
      setDiscoverEnabled(check)
   }

   if (!products || products.length === 0) return null

   return (
      <div className="space-y-4 mb-8 flex flex-col items-center gap-4">
         {products.map(product => {
            if (isCheckCoverageProduct(product)) {
               return (
                  <CheckCoverage
                     key={product.guid}
                     onCoverageResponse={handleCoverageResponse}
                     showError={hasCheckCoverage && !discoverEnabled}
                  />
               )
            }
            if (product.config.isQuantity == true) {
               return (
                  <QuantitySwitch
                     key={product.guid}
                     product={product}
                     value={simValues[product.guid] || 0}
                     dispatch={dispatch}
                     tofId={tofId}
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
                  icon={ProductIcon.getByIconName(product.config.mdiIcon)}
               />
            )
         })}
         <button
            type="button"
            className="w-[60%] max-w-[250px] mt-6 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-3xl shadow transition-all disabled:opacity-50"
            onClick={() => window.location.assign('/telco/offerta-home')}
            disabled={!discoverEnabled}
         >
            {t('Scopri le offerte').toUpperCase()}
         </button>
      </div>
   )
}

export default Products
