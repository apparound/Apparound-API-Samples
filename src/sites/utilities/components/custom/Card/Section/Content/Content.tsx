import React from 'react'
import Item, { ContentItemProps } from './Item'

interface ContentProps {
    title: string,
    items?: ContentItemProps[],
    info?: string
}

const Content = ({ items, title, info }: ContentProps) => {
    return (
        <div className='flex flex-col w-full gap-2 text-left py-2 text-lg pr-2'>
            <Item info={info} title={title} />
            {items ? (
                <div className='pl-3 flex flex-col gap-3'>
                    {items.map((item, index) => (
                        <Item {...item} key={index} />
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default Content
