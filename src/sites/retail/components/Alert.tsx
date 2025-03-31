import Icon from '@mdi/react'
import React from 'react'

interface AlertPropsI {
    size?: number,
    title: string,
    icon?: string,
    hide: boolean
}

const sizes = {
    1: {
        alert: 'border border-[#FBC300] p-2 bg-[#FFF8E2] rounded text-[12px] text-left flex gap-1 items-center',
        icon: 'text-[#FBC300]'
    }
}

const Alert = ({ title, size, icon, hide }: AlertPropsI) => {
    const className = sizes[size || 1] || sizes[1]
    return (
        <div className={`${className.alert} ${hide ? 'opacity-0' : ''}`}>
            {icon ? (
                <Icon path={icon} size={1} className={className.icon} />
            ) : null}
            {title}
        </div>
    )
}

export default Alert
