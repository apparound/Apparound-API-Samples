import React from 'react'

interface TitlePropsI {
    size?: number,
    title: string
}

const sizes = {
    1: 'text-3xl text-primary',
    2: 'text-2xl font-bold',
    3: 'text-2xl text-primary font-bold',
    4: 'text-xl text-primary',
}

const Title = ({ title, size }: TitlePropsI) => {
    const className = sizes[size || 1] || sizes[1]
    return (
        <div className={className}>{title}</div>
    )
}

export default Title
