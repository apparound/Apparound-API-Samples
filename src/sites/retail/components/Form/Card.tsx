import React from 'react'
import CardComponent from '@/sites/utilities/components/custom/Card'
import Form from './Form'

interface CardProps {
    children: any[],
    values?: {
        [key: string]: any
    },
    onChange: (value: string|number|boolean, name: string) => any
}

const Card = ({ children, onChange, values }: CardProps) => {
    return (
        <CardComponent className='w-full flex-1 py-10 border-4 shadow-none'>
            <Form children={children} values={values} onChange={onChange} />
        </CardComponent>
    )
}

export default Card
