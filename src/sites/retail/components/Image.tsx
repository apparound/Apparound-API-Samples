import React from 'react'
import { useTranslation } from 'react-i18next'
import ImmagineBici from '@/sites/retail/assets/images/retail_header.jpg'

interface HeaderPropsI {}

const Header = ({}: HeaderPropsI) => {
    const { t } = useTranslation()
    return (
        <div className='h-80 overflow-hidden relative flex items-center'>
            <img className='object-cover object-center w-full h-full absolute -z-10' src={ImmagineBici} />
            <div className='container'>
                <div className='text-3xl lg:text-6xl mb-10 text-white font-bold'>{t('Personalizza la tua bici')}</div>
                <div className='text-lg lg:text-4xl text-white' dangerouslySetInnerHTML={{ __html: t('Crea la bici dei tuoi sogni, asseconda il tuo stile e le tue necessità.<br />Rendila su misura per te con le varie combinazioni disponibili.') }}></div>
            </div>
        </div>
    )
}

export default Header
