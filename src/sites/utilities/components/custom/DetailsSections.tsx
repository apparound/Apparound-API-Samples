import SectionHeader from './texts/SectionHeader'
import { mainServicesId } from '../../utils/constants'
import Box from './Box'
import { getCartIdFromMainProductId, searchTree } from '@/utils/treeManager'
import ProductListElement from './ProductListElement'
import { findNodeProperty } from '@/sites/utilities/hooks/useQuote'
import { useTranslation } from 'react-i18next'
import { Separator } from '../ui/separator'

interface DetailsSectionsProps {
   mainServiceId: number
}

const priceUnits = {
   27441: '€/mese',
   27440: '€',
   27442: '€/kWh',
}

const renderProductList = products => {
   const { t } = useTranslation()

   const tree = localStorage.getItem('validProducts')
   const productList = []
   let previousClusterId = null

   const traverseProducts = (products, level = 0) => {
      products.forEach((product, index) => {
         const node = findNodeProperty('uniqueGuid', product.uniqueGuid, null, null, tree)
         const imageSrc = node?.productDetail?.icon
         const priceUnit = priceUnits[node?.categoryId] || '€'
         const price = product.price > 0 ? `${product.price} ${t(priceUnit)}` : ''

         if (previousClusterId !== null && previousClusterId !== product.clusterId) {
            productList.push(<Separator className="my-4 border-t-2" />)
         }

         productList.push(
            <div key={product.id}>
               <ProductListElement id={product.id} imageSrc={imageSrc} title={product.label} price={price} />
            </div>
         )

         previousClusterId = product.clusterId

         if (product.children && product.children.length > 0) {
            traverseProducts(product.children, level + 1)
         }
      })
   }

   traverseProducts(products)
   return productList
}

const DetailsSections: React.FC<DetailsSectionsProps> = ({ mainServiceId }) => {
   const { t } = useTranslation()
   const headerText = mainServiceId == mainServicesId.LUCE ? t('Dettagli offerta luce') : t('Dettagli offerta gas')
   const basketId = getCartIdFromMainProductId(mainServiceId)
   const mainNodeChildren = searchTree('mainProductId', mainServiceId, basketId).children

   return (
      <div className="space-y-4 mt-8">
         <SectionHeader text={headerText} />
         <Box key={`box-${mainServiceId}`} className="border border-4 border-gray-300 rounded-[15px] p-4">
            {renderProductList(mainNodeChildren)}
         </Box>
      </div>
   )
}

export default DetailsSections
