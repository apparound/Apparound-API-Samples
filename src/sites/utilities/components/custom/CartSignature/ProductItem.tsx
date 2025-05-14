import React from 'react'
import Content from '@/sites/utilities/components/custom/Card/Section/Content'

interface productItemI {
   product: any
   withSeparator?: boolean
   priceModel?: string
}

const ProductItem = ({ product, withSeparator, priceModel }: productItemI) => {
   const isF: boolean = product.label.startsWith('F')
   return (
      <div className={product.label.startsWith('F') ? 'pl-4' : null}>
         {withSeparator && !isF ? <hr className="w-full" /> : null}
         <Content
            title={product.label}
            info={product.price ? `${(product.price / product.quantity).toFixed(2)}€/${priceModel || ''}` : null}
         />
         {product.children.map((innerProduct, index) => {
            return <ProductItem product={innerProduct} withSeparator={true} priceModel={priceModel} key={index} />
         })}
      </div>
   )
}

export default ProductItem
