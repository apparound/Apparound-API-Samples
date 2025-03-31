import React from 'react'
import { useTranslation } from 'react-i18next'

interface CheckBoxProps {
    name: string,
    label: string,
    required?: boolean,
    value?: string,
    onChange: (value: string|number|boolean, name: string) => any
}

const CheckBox = ({ name, label, required, onChange, value}: CheckBoxProps) => {
    const { t } = useTranslation()
    return (
        <div className='relative flex gap-4'>
            <input
                type='checkbox'
                name={name}
                id={name}
                onChange={(e) => onChange(e.target.checked, name)}
                required={required}
                placeholder=' '
                value={value || ''} 
                className='accent-primary ml-1 scale-150'
            />
            <label htmlFor={name} >
                {t(label)} {required ? '*' : ''}
            </label>
        </div>
    )
}

export default CheckBox
