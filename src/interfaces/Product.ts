export interface Product {
   appId: number
   bundleId: string
   categoryid: number
   greyedOut: number
   hideOnBucket: number
   hideOnCart: number
   hideOnSummary: number
   hideTrashOnCart: number
   id: number
   parentGuid: string
   productCode: string
   productName: string
   productFullName: string
   productCategoryLabel: string
   productDetail: {
      id: number
      code: string
      name: string
      shortname: string
      printName: string
   }
   productId: number
   rank: number
   salesHistoryValues: any[]
   typeOfferName: string | null
   uniqueGuid: string
   virtualCategoryId: string
   virtualProductId: string
   virtualTofProductId: string
   offerTypeProductId: number
   children: Product[]
   nodeId: number
   netRecurringPriceWithVatAmount: number,
   oneOffPriceWithVatAmount: number,
   clusterId: number
   clusterName: number,
   quantity: number
}
