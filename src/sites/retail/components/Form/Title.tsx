import React from 'react'
import { useTranslation } from 'react-i18next'

interface TitleProps {
    label: string,
    className?: string
}

const Title = ({ label, className }: TitleProps) => {
    const { t } = useTranslation()
    return (
        <div className={`text-lg font-bold ${className}`} dangerouslySetInnerHTML={{ __html: t(label)}} />
    )
}

export default Title
