import { ApparoundData } from '@/sites/utilities/hooks/use-apparound-data'
import { Product } from '@/interfaces/Product'
import jsonQ from 'jsonq'

export const initQuoteSession = async (cpqId: number, customerId: number) => {
   const apparoundData: any = new ApparoundData()
   return await apparoundData.initQuoteSession(cpqId, customerId)
}

export const getStartingProducts = async (cpqId: number, tofId: number): Promise<Product[]> => {
   const apparoundData: any = new ApparoundData()
   const products = await apparoundData.getStartingProducts(cpqId, tofId)

   return products.leftAxis[0].productsTOF as Product[]
}

const getQuoteFromLocalStorage = (): any => {
   const quote = localStorage.getItem('currentQuote')
   return quote ? JSON.parse(quote).solutions : null
}

const getQuote = (): any => {
   return getQuoteFromLocalStorage()
}

export const findNodeProperty = (
   key: string,
   value: string,
   property?: string,
   findParent: boolean = false,
   sourceTree?: any
): any => {
   sourceTree = sourceTree || getQuote()
   if (!sourceTree) return null

   const jsonQobj = jsonQ(sourceTree || [])
   const nodes = jsonQobj.find(key, function () {
      return this.toString() == value
   })

   if (nodes.length == 1) {
      const path = nodes.jsonQ_current[0].path.slice(0, findParent ? -3 : -1)
      const node = jsonQobj.pathValue(path)

      if (!node) return null
      return property ? node[property] || null : node
   }

   return null
}

export const findNodeForKey = (key: string, value: string, sourceTree?: any): any => {
   return findNodeProperty(key, value, undefined, false, sourceTree)
}

export const findNode = (uniqueGuid: string, sourceTree?: any): any => {
   return findNodeProperty('uniqueGuid', uniqueGuid, undefined, false, sourceTree) || null
}

export const findNodeId = (uniqueGuid: string, sourceTree?: any): number => {
   return findNodeProperty('uniqueGuid', uniqueGuid, 'nodeId', false, sourceTree) || -1
}

export const findParentNodeId = (uniqueGuid: string, sourceTree?: any): number => {
   return findNodeProperty('uniqueGuid', uniqueGuid, 'nodeId', true, sourceTree) || -1
}

export const getProductListForUI = (): any[] => {
   const quote = getQuoteFromLocalStorage()
   if (!quote) return []

   const list: any[] = []
   const extractNodes = (node: any) => {
      list.push(node)
      node.children?.forEach(extractNodes)
   }

   if (quote) quote.solutions.forEach((solution: any) => solution.root.forEach(extractNodes))

   return list
}
