import React from 'react'
import { useTranslation } from 'react-i18next'
import Title from '@/sites/retail/components/Title'
import Recap from '@/sites/retail/components/Cart/Recap'
import Form from '@/sites/retail/components/Cart/Form/Form'

const Cart = () => {
    const { t } = useTranslation()

    return (
        <div className='flex flex-col h-full'>
            <div className='bg-[#F4F4F4] py-4'>
                <Title title={t('Carrello')} size={3} />
            </div>
            <div className='flex-1 overflow-y-auto py-10'>
                <div className='container'>
                    <div className='flex flex-col gap-10'>
                        <Recap />
                        <div>
                            <Title title={t('Pronto a pedalare?')} size={1} />
                        </div>
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
