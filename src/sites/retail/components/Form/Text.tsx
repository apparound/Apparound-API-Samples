import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface TextProps {
    name: string,
    label: string,
    inputType?: string,
    required?: boolean,
    value?: string,
    onChange: (value: string|number|boolean, name: string) => any
}

const Text = ({ name, label, inputType, required, onChange, value}: TextProps) => {
    const { t } = useTranslation()
    const [inputValue, setInputValue] = useState(value || '')
    const [disabled, setDisabled] = useState(false)

    const onInputChange = (e) => {
        onChange(e.target.value, name)

        setInputValue(e.target.value)
    }

    useEffect(() => {
        if (value !== inputValue) {
            setInputValue(value || '')

            setDisabled(!!value || value === null)
        }
    }, [value])
    return (
        <div className='relative'>
            <input
                type={inputType || 'text'}
                name={name}
                id={name}
                className='block bg-white px-3 py-1.5 pt-3 w-full text-base text-gray-900 rounded outline outline-1 -outline-offset-1 outline-[#DDDDDD] focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6 peer :invalid:outline-red-300 disabled:bg-[#fafafa]'
                onChange={onInputChange}
                required={required}
                placeholder=' '
                value={inputValue}
                disabled={disabled}
            />
            <label
                htmlFor={name}
                className='absolute text-[#1d1b20] dark:text-[#1d1b20] duration-300 transform -translate-y-5.5 scale-75 top-2 z-10 origin-[0] bg-white peer-placeholder-shown:bg-transparent peer-focus:bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'>
                    {t(label)} {required ? '*' : ''}
            </label>
        </div>
    )
}

export default Text
