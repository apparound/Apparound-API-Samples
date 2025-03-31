import React from 'react'

interface ItemPropsI {
    label: string,
    info: string
}

const Item = ({ label, info }: ItemPropsI) => {
    return (
        <div className='lg:flex gap-2 text-left text-xl py-2'>
            <div className='font-bold inline lg:block'>{label}:</div>
            <div className='inline lg:block'> {info}</div>
        </div>
    )
}

export default Item
