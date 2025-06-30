import { findNodeForKey } from '@/hooks/useQuote'
import { getOfferTitle, extractCartGuids } from '@/utils/offerUtils'

interface Product {
   guid: string
   description?: string
   clusters?: any[]
}

interface CartObj {
   [key: string]: any
}

interface GetAddonsProps {
   products: Product[]
   cart: any
   tree: any
   quotePrice: number
   setOfferTitle: (title: string) => void
   t: (key: string) => string
}

export function getAddons({ products, cart, tree, quotePrice, setOfferTitle, t }: GetAddonsProps): any[] {
   if (!products.length || !cart) {
      return []
   }

   const cartGuids = extractCartGuids(cart)

   const offerTitle = getOfferTitle(products, cartGuids, t)
   setOfferTitle(offerTitle)

   const selectedProduct = products.find((p: any) => cartGuids.includes(p.guid))
   let newAddons: any[] = []

   if (selectedProduct?.clusters) {
      newAddons = [...selectedProduct.clusters]
   }

   if (tree) {
      let treeProducts = cartGuids.map(guid => findNodeForKey('guid', guid, tree)).filter(node => node)
      if (treeProducts.length > 0) {
         // Hardcoded activation product
         const activationProduct = {
            id: 1,
            label: t('Attivazione offerta'),
            price: quotePrice,
            guid: crypto.randomUUID(),
            config: {
               mdiIcon: 'mdiRocketLaunch',
            },
         }
         treeProducts = [activationProduct, ...treeProducts]
         //Aggiungo fake product attivazione
         const carrelloObj = {
            id: 2,
            label: t('Offerta'),
            products: treeProducts,
         }
         return [carrelloObj, ...newAddons]
      }
   }

   return newAddons
}
