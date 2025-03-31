import React from 'react'

export interface InfoProps {
    className?: string,
    variant?: number,
    info?: string,
    label: string
}

interface variantInterface {
    label: string,
    info?: string
}

interface variants {
    [key: number]: variantInterface
}

const variants: variants = {
    1: {
        label: 'text-[#a8a8a8]',
        info: 'text-lg'
    },
    2: {
        label: 'font-bold',
        info: ''
    }
}

const Info = ({ className, variant = 1, info, label }: InfoProps) => {
    return (
        <div className={`text-left ${className || ''}`}>
            <div className={`${(variants[variant] || variants[1]).label}`}>{label}</div>
            {info ? (
                <div className={`${(variants[variant] || variants[1]).info} leading-4`}>{info}</div>
            ) : null}
        </div>
    )
}

export default Info
