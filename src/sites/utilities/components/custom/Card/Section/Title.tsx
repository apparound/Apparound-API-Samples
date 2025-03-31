import React, { ReactNode } from 'react'
import Icon from '@mdi/react'

interface TitleProps {
    title: string,
    icon?: string,
    info?: string
}

const Title = ({ icon, title, info }: TitleProps) => {
    return (
        <div className='flex w-full p-2 bg-[#f4f4f4] gap-2 items-center text-xl'>
            {icon ? (
                <div>
                    <Icon path={icon} size={1} className='text-primary' />
                </div>
            ) : null}
            <div className='flex-1 text-left text-primary font-semibold'>{title}</div>
            {info ? (
                <div>{info}</div>
            ) : null}
        </div>
    )
}

export default Title
