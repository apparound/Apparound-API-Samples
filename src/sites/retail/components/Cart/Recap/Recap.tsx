import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartClusters } from '@/sites/retail/features/quoteSlice'
import Image from './Image'
import Footer from './Footer'
import Title from './Title'
import Item from './Item'

const Recap = () => {
   const cartClusters = useSelector(selectCartClusters)
   return (
      <div className="rounded border-[3px] border-[#DCE1E6] overflow-hidden w-full">
         <div className="lg:grid lg:grid-cols-2">
            <Image />
            <div className="p-5">
               <Title />
               <Item label={cartClusters.mainCluster.shortName} info={cartClusters.selectedSize.label} />
               {cartClusters?.clusters.map((cluster, index) => {
                  return <Item label={cluster.shortName} info={cluster.selectedProduct?.label} key={index} />
               })}
            </div>
         </div>
         <Footer />
      </div>
   )
}

export default Recap
