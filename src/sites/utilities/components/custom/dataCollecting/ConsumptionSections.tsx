import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/sites/utilities/components/ui/button'
import { useConsumption } from '@/sites/utilities/context/ConsumptionContext'
import { BottomAxisProduct } from '@/interfaces/ProductInterfaces'
import ProductList from './ProductList'
import { getCartIds } from '@/utils/treeManager'
import { fetchValidProducts } from '@/utils/fetchValidProducts'
import { Separator } from '../../ui/separator'

const ConsumptionSections = ({ navigate }) => {
   const { t } = useTranslation()
   const { selectedServices, setSelectedServices, surfaceArea } = useConsumption()

   const [validProducts, setValidProducts] = useState<{ [key: string]: BottomAxisProduct[] }>({})
   const [renderTrigger, setRenderTrigger] = useState(false)

   useEffect(() => {
      const basketIds = getCartIds()
      basketIds.forEach(basketId => {
         fetchValidProducts(basketId, setValidProducts)
      })
   }, [selectedServices, renderTrigger])

   useEffect(() => {}, [validProducts])

   const basketIds = getCartIds()

   return (
      <div className="space-y-6 mt-8">
         {Object.keys(validProducts).map(basketId =>
            basketIds.includes(Number(basketId)) ? (
               <ProductList
                  key={basketId}
                  validProducts={validProducts[basketId]}
                  setSelectedService={setSelectedServices}
                  setValidProducts={setValidProducts}
                  basketId={basketId}
                  setRenderTrigger={setRenderTrigger}
               />
            ) : null
         )}
         <div className="mt-8 text-center">
            <Separator className="my-4" />
            <Button
               size="lg"
               className="bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
               onClick={() =>
                  navigate('/summary', {
                     state: { surfaceArea, selectedServices },
                     replace: true,
                  })
               }
            >
               {t('Calcola preventivo').toUpperCase()}
            </Button>
         </div>
      </div>
   )
}

export default ConsumptionSections
