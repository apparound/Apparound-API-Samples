import React, { ReactNode } from 'react'

interface CardProps {
    children: ReactNode
    className?: string
}

const Card = ({ children, className = '' }: CardProps) => {
    return <div className={`${className} p-5 rounded-2xl shadow-1app flex flex-col justify-center items-center`}>{children}</div>
}

export default Card
