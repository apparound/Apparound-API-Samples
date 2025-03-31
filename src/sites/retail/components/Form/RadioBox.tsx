import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface item {
    icon: any,
    info: string,
    label: string,
    value: string|number
}

interface RadioBoxProps {
    name: string,
    children: item[],
    value: string|number,
    onChange: (value: string|number|boolean, name: string) => any
}

const RadioBox = ({ name, value, children, onChange }: RadioBoxProps) => {
    const { t } = useTranslation()
    const [selected, setSelected] = useState<string|number>(value)
    useEffect(() => {
        if (selected) {
            onChange(selected, name)
        }
    }, [selected])
    return (
        <div className='flex justify-center gap-5'>
            {children.map((item, index) => {
                const Image = item.icon
                return (
                    <div className={`service-option max-w-52 min-w-52 !gap-0 ${item.value === selected ? 'selected' : ''}`} key={index} onClick={() => setSelected(item.value)}>
                        <div className='w-24 h-24 mb-3'>
                            <Image className='w-24 h-24' />
                        </div>
                        <span className="text-xl font-bold text-center mb-2 text-primary">{t(item.label)}</span>
                        <span className="text-sm font-normal">{t(item.info)}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default RadioBox
