import React from 'react'
import { useTranslation } from 'react-i18next'
import IconComponent from '@mdi/react'

interface IconProps {
    icon: string,
    label?: string,
    size: number
}

const Icon = ({ icon, label }: IconProps) => {
    const { t } = useTranslation(); // Inizializza useTranslation
    return (
        <div className='w-full flex flex-col items-center text-primary'>
            <IconComponent path={icon} size={4} />
            {label ? (<div className='text-2xl font-medium'>{t(label)}</div>) : null}
        </div>
    )
}

export default Icon
