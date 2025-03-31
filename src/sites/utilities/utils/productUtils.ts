import { Product } from '@/interfaces/Product'

export const findCurrentProduct = async (productId): Promise<Product> => {
   const quote = JSON.parse(localStorage.getItem('currentQuote'))
   const solutionsRoot = quote.solutions[0].root

   const searchProduct = (products): Product => {
      for (const product of products) {
         if (product.productId === productId) {
            return product
         }
         if (product.children && product.children.length > 0) {
            const foundProduct = searchProduct(product.children)
            if (foundProduct) {
               return foundProduct
            }
         }
      }
      return null
   }

   return searchProduct(solutionsRoot)
}
