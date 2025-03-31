import React from 'react'
import Spinner from '@/components/Spinner'
import { useSelector } from 'react-redux'
import { selectShowPageLoader } from '@/sites/retail/features/appSlice'

interface PageLoaderPropsI {}

const PageLoader = ({}: PageLoaderPropsI) => {
    const showPageLoader = useSelector(selectShowPageLoader)
    return showPageLoader ? (
        <div className='fixed top-0 right-0 left-0 bottom-0 z-30 flex justify-center items-center bg-[#000000bf]'>
            <Spinner />
        </div>
    ) : null
}

export default PageLoader
