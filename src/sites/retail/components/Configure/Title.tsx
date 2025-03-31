import React from 'react'
import TitleComponent from '@/sites/retail/components/Title'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectMainProduct } from '@/sites/retail/features/quoteSlize'

const Title = () => {
    const { t } = useTranslation()
    const currentMainProduct = useSelector(selectMainProduct)
    return (
        <div className='bg-[#F4F4F4] py-4'>
            <TitleComponent title={`${t('Configura la tua')} ${currentMainProduct?.label}`} size={3} />
        </div>
    )
}

export default Title
