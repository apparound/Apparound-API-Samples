interface Product {
   guid: string
   description?: string
   clusters?: any[]
}

/**
 * Estrae il titolo dell'offerta dal prodotto selezionato
 * @param products - Array di prodotti disponibili
 * @param cartGuids - Array di GUID presenti nel carrello
 * @param t - Funzione di traduzione
 * @returns Il titolo dell'offerta tradotto o una stringa vuota se non trovato
 */
export function getOfferTitle(products: Product[], cartGuids: string[], t: (key: string) => string): string {
   if (!products.length || !cartGuids.length) {
      return ''
   }

   const selectedProduct = products.find((p: Product) => cartGuids.includes(p.guid))

   if (selectedProduct?.description) {
      return t(selectedProduct.description)
   }

   return ''
}

/**
 * Estrae i GUID dal carrello in formato compatibile
 * @param cart - Oggetto carrello
 * @returns Array di GUID dal carrello
 */
export function extractCartGuids(cart: any): string[] {
   if (!cart) {
      return []
   }

   return Array.isArray(cart)
      ? cart
      : typeof cart === 'object' && cart !== null
      ? Object.keys(cart[Object.keys(cart)[0]]?.children || {})
      : []
}
