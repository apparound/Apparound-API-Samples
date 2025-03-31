import React, { useState } from 'react'
import Header from './Header'
import Cluster from './Cluster'
import Footer from './Footer'

const Products = () => {
    return (
        <div className='flex flex-col md:min-w-[400px] md:max-w-[400px] lg:min-w-[500px] lg:max-w-[500px] border-l-2 border-[#DCE1E6] bg-[#F4F4F4]'>
            <div className='flex flex-col flex-1 overflow-auto'>
                <Header />
                <Cluster />
            </div>
            <Footer />
        </div>
    )
}

export default Products
