import React, { ReactNode } from 'react'

interface infoI {
    label: string,
    info?: string
}

interface TitlePropsI {
    action: ReactNode,
    title: string,
    info: infoI
}

const Title = ({ action, title, info }: TitlePropsI) => {
    return (
        <div className='flex items-center p-4 gap-5'>
            <div className='flex-1 text-left'>
                <div className='uppercase font-bold'>{title}</div>
                <div className='text-sm flex'>
                    <div className='flex-1'>{info.label}</div>
                    {info.info ? (<div>{info.info}</div>) : ''}
                </div>
            </div>
            <div>{action}</div>
        </div>
    )
}

export default Title
