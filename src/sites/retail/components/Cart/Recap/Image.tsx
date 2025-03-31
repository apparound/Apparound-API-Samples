import React from 'react'
import { useSelector } from 'react-redux'
import { getImageUrl } from '@/utils/utils'
import { selectColorProduct } from '@/sites/retail/features/quoteSlize'

const Image = () => {
    const colorProduct = useSelector(selectColorProduct)
    return (
        <div className='lg:flex lg:h-[100%] items-center justify-center p-10'>
            <div className='overflow-hidden relative lg:w-full lg:h-full'>
                <img src={getImageUrl(colorProduct.image)} className='lg:absolute object-contain w-[100%] h-[100%]' />
            </div>
        </div>
    )
}

export default Image
