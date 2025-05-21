import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import SectionTitle from '@/sites/utilities/components/custom/texts/SectionTitle'
import { ServiceSelector } from '@/sites/utilities/components/custom/ServiceSelector'
import { handleSelectService } from '@/sites/utilities/utils/handleSelectService'
import { getMainProductIdForBasketId, getSelectedProduct } from '@/utils/treeManager'
import SectionHeader from '@/sites/utilities/components/custom/texts/SectionHeader'
import { mainServicesId } from '@/sites/utilities/utils/constants'

const ProductList = ({ validProducts, setSelectedService, setValidProducts, basketId, setRenderTrigger }) => {
   const { i18n } = useTranslation()
   const { t } = useTranslation()
   const [renderTrigger, setRenderTriggerState] = useState(false)

   const handleServiceSelect = async service => {
      await handleSelectService(service, setValidProducts, basketId)
      setRenderTrigger(prev => !prev)
   }

   const mainProductId = getMainProductIdForBasketId(basketId)
   const sectionHeaderName = mainProductId == mainServicesId.LUCE ? t('Luce') : t('Gas')

   return (
      <>
         <SectionHeader text={sectionHeaderName} />
         {(validProducts || []).map((cluster, index) => {
            const currentQuote = JSON.parse(localStorage.getItem('currentQuote'))
            const excludedProductId = currentQuote?.solutions[0]?.root[0]?.children[0]?.offerTypeProductId

            const services = cluster.productsTOF
               .filter(tofProduct => tofProduct.offerTypeProductId !== excludedProductId)
               .filter(tofProduct => !['F1', 'F2', 'F3'].includes(tofProduct.productName))
               .map(tofProduct => {
                  const languagePrefix = i18n.language?.substring(0, 2) || 'en'
                  const descriptionHeadless = tofProduct.productDetail?.config?.find(
                     configItem => configItem.code === `${languagePrefix}_descriptionHeadless`
                  )?.value
                  return {
                     productId: tofProduct.productId,
                     icon: tofProduct.productDetail?.icon,
                     label: tofProduct.productName,
                     tofProductId: tofProduct.offerTypeProductId,
                     uniqueId: tofProduct.uniqueGuid,
                     clusterId: cluster.id,
                     descriptionHeadless: descriptionHeadless,
                  }
               })

            if (services.length === 0) return null

            const selectedServiceIds = getSelectedProduct(basketId, cluster.id)

            return (
               <div key={index}>
                  <SectionTitle textKey={cluster.name} />
                  <div className="mb-4" />
                  <ServiceSelector
                     selected={[selectedServiceIds]}
                     services={services}
                     onSelectService={handleServiceSelect}
                  />
               </div>
            )
         })}
      </>
   )
}

export default ProductList
