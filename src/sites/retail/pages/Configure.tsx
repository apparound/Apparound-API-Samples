import React from 'react'
import Title from '@/sites/retail/components/Configure/Title'
import Image from '@/sites/retail/components/Configure/Image'
import Products from '@/sites/retail/components/Configure/Products'

interface ConfigurePropsI {}

const Configure = ({}: ConfigurePropsI) => {
    return (
        <div className='flex flex-col h-full'>
            <Title />
            <div className='flex-1 md:overflow-hidden my-1'>
                <div className='flex flex-col md:flex-row h-full'>
                    <Image />
                    <Products />
                </div>
            </div>
        </div>
    )
}

export default Configure
