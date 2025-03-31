import { Product } from '../interfaces/Product'

export interface Cart {
   basketId: string
   nodeId: string
   mainProductId: string
   uniqueGuid: string
   label: string
   children: Product[]
   tofProductId: number
}

export interface Cluster {
   clusterId: string
   name: string
   children: Product[]
}
