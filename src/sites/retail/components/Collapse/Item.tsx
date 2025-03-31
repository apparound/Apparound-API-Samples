import React from 'react'

interface ItemPropsI {
    img: string,
    text: string,
    info: string,
    onClick: any,
    isSelected: boolean
}

const Item = ({ img, text, info, onClick, isSelected }: ItemPropsI) => {
    return (
        <button className='w-full flex items-center gap-3 py-4 [&+.peer]:border-t border-[#ccc] peer' onClick={onClick}>
            <div className={`rounded overflow-hidden uppercase font-bold ${isSelected ? 'outline outline-[3px] outline-offset-2 outline-primary' : ''}`}>
                <img src={img} className='w-[100px] h-[100px] object-contain' />
            </div>
            <div className='text-sm flex-1 text-left'>{text}</div>
            <div>{info}</div>
        </button>
    )
}

export default Item
