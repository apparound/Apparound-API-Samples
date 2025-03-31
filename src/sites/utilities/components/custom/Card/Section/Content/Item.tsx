import React from 'react'

export interface ContentItemProps {
    title: string,
    info?: string
}

const ContentItem = ({ title, info }: ContentItemProps) => {
    return (
        <div className='flex'>
            <div className='flex-1'>{title}</div>
            {info ? (
                <div>{info}</div>
            ) : null}
        </div>
    )
}

export default ContentItem
