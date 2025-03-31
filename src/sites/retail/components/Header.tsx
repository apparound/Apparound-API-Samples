import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Logo from '@/assets/images/logo.png'
import Icon from '@mdi/react'
import { mdiCartOutline, mdiCart, mdiCreation } from '@mdi/js'
import CarrelloVuoto from '@/sites/retail/assets/images/retail_carrello-vuoto.svg'
import { selectAddedToCart } from '@/sites/retail/features/quoteSlize'
import useRelativeNavigate from '@/utils/navigate'

interface HeaderPropsI {}

const Header = ({}: HeaderPropsI) => {
    const { t } = useTranslation()
    const navigate = useRelativeNavigate()
    const addedToCart = useSelector(selectAddedToCart)
    const [showCartContent, setShowCartContent] = useState(false)
    return (
        <div className='border-b-2 border-[#DCE1E6]'>
            <div className='flex justify-between items-center relative'>
                <button onClick={() => window.location.href = '/'}>
                    <img className='h-16' src={Logo} />
                </button>
                <div className='px-6 z-20'>
                    <button onClick={() => {
                        if (addedToCart) {
                            navigate('/cart')
                        } else {
                            setShowCartContent(!showCartContent)
                        }
                    }} className='text-[#515151] relative'>
                        <Icon path={addedToCart ? mdiCart : mdiCartOutline} size={'36px'} />
                        {addedToCart ? (
                            <Icon path={mdiCreation} size={'16px'} className='absolute text-primary absolute -top-3 right-0' />
                        ) : ''}
                    </button>
                    {showCartContent ? (
                        <div className='w-auto absolute right-0 top-[100%] -mt-1 px-8 py-4 bg-white rounded-[4px] shadow-2app'>
                            <div className='flex flex-col items-center justify-center text-sm'>
                                <div className='mb-3 [&>svg]:w-13 [&>svg]:h-13'>
                                    <CarrelloVuoto />
                                </div>
                                <div className='font-bold whitespace-nowrap'>{t('Il carrello è vuoto')}</div>
                                <div className='whitespace-nowrap'>{t('Configura la tua bici e aggiungila')}</div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Header
