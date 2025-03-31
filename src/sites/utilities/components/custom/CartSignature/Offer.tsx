import React, { ReactNode } from 'react'
import Card from '@/sites/utilities/components/custom/Card'
import Section from '@/sites/utilities/components/custom/Card/Section'
import SectionTitle from '@/sites/utilities/components/custom/Card/Section/Title'
import { getCart, getTree } from '@/utils/treeManager'
import { mdiLightbulbOnOutline, mdiGasBurner } from '@mdi/js'
import ProductItem from '@/sites/utilities/components/custom/CartSignature/ProductItem'
import { useTranslation } from 'react-i18next'

interface OfferProps {
   className?: string
   children?: ReactNode
   hideTitle?: boolean
}

const Offer = ({ className, children, hideTitle = true }: OfferProps) => {
   // Imposta il valore predefinito
   const tree = getTree()
   const { t } = useTranslation()

   return (
      <Card className={`${className || ''} lg:w-3/4`}>
         {!hideTitle && <p className="text-primary font-medium text-2xl mb-6">{t('Riepilogo')}</p>}
         {tree.map((cluster, index) => {
            const cart: any = getCart(cluster.basketId)
            const priceModel: string = cluster.label === 'Luce' ? 'kWh' : 'mc'
            cluster.children.sort((a: any) => {
               return a.label === 'Costi commercializzazione' ? 1 : a.clusterName === 'Tipo di tariffa' ? -1 : 0
            })
            return (
               <Section className={'mb-6'} key={index}>
                  <SectionTitle
                     icon={cluster.label === 'Luce' ? mdiLightbulbOnOutline : mdiGasBurner}
                     title={cluster.label}
                     info={`${cart.price.toFixed(2)}€/mese`}
                  />
                  {cluster.children.map((product: any, productIndex: number) => {
                     const label: string =
                        product.clusterName !== 'Extra' ? `${product.clusterName} (${product.label})` : product.label
                     return (
                        <ProductItem
                           key={`${index}-${productIndex}`}
                           withSeparator={!!productIndex}
                           product={{
                              ...product,
                              label,
                           }}
                           priceModel={priceModel}
                        />
                     )
                  })}
               </Section>
            )
         })}
         {children}
      </Card>
   )
}

export default Offer
