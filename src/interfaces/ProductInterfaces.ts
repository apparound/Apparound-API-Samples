export interface ProductDetail {
   id: number
   code: string
   icon: string
   config: Array<{ code: string; value: string }>
   productPriceDefinition: Array<{
      id: number
      price: number
      commitment: number
      activationprice: number
      code: string
      description: string
      note: string
      multiplier: boolean
      paymentid: number
      paymentName: string | null
      active: boolean
      shownumitems: boolean
      showonlycompatible: boolean
      productId: number
      uniqueGuid: string
      appId: number
      recurringIntervalId: number
      pricingModelId: number
      hasActivationPrice: boolean
      hasRecurringPrice: boolean
      vatCategoryId: number
      aggregateChildrenPrices: boolean
      excludeFromTotal: boolean
      unitOfMeasureId: number
      enableOneOffReprice: boolean
      enableRecurringReprice: boolean
      oneOffCost: number | null
      oneOffRecommendedPrice: number | null
      recurringCost: number | null
      recurringRecommendedPrice: number | null
   }>
}

export interface Product {
   id: number
   productId: number
   productName: string
   productShortName: string
   categoryid: number
   uniqueGuid: string
   rank: number
   greyedOut: number
   parentGuid: string
   productDetail: ProductDetail
   offerTypeProductId: number
   parentId: number
   icon: string
}

export interface BottomAxisProduct {
   id: number
   name: string
   shortname: string
   icon: string
   rank: number
   uniqueGuid: string
   appId: number
   tofId: number
   productsTOF: Product[]
   deleted: boolean
}
