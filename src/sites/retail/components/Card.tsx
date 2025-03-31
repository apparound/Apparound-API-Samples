import React from 'react'
import IniziaConfigurazione from '@/sites/retail/assets/images/retail_inizia-configurazione.svg'
import Title from './Title'
import { useTranslation } from 'react-i18next'

interface CardPropsI {
    image: string,
    title: string,
    info: string,
    description: string,
    onClick: any,
    active?: boolean
}

const Card = ({ image, title, info, description, onClick, active }: CardPropsI) => {
    const { t } = useTranslation()
    return (
        <button className={`rounded border-[3px] border-[#DCE1E6] ${active ? 'border-primary' : ''} hover:border-primary overflow-hidden ease-in-out duration-300 w-full`} onClick={onClick}>
            <div className='relative'>
                <div className='h-0 pt-[70%] relative overflow-hidden'>
                    <img src={image} className='absolute top-0 left-0 right-0 w-full h-full bottom-0 object-contain w-full hfull' />
                </div>
                <div className='absolute top-4 right-4 rounded-2xl bg-[#f4f4f4] px-4 py-1 text-[#a6a6a6]'>{info}</div>
                <div className='p-4'>
                    <Title title={title} size={2} />
                    <div>{description}</div>
                </div>
                <div className='border-t-[3px] border-primary bg-[#f4f4f4] flex justify-center py-4'>
                    <div className='flex items-center gap-4 text-primary font-medium text-lg'>
                        <div className='w-8 h-8 [&>svg]:w-full [&>svg]:h-full'><IniziaConfigurazione /></div>
                        <div>{t('Inizia configurazione')}</div>
                    </div>
                </div>
            </div>
        </button>
    )
}

export default Card
