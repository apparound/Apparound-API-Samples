import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { config } from '@/sites/retail/config'
import Text from '@/sites/retail/components/Form/Text'
import Products from './Products'
import Button from '@/sites/retail/components/Button'

const Calculate = () => {
    const { t } = useTranslation()
    const [sizes, setSizes] = useState({ p: '', c: '' })
    const [size, setSize] = useState(null)
    const [calculatedSize, setCalculatedSize] = useState(false)
    const [showSizeAlert, setShowSizeAlert] = useState(false)
    const onChange = (value, type) => {
        setSizes({
            ...sizes,
            [type]: value
        })
    }
    const calculate = () => {
        const currentSize = config.sizeCalculator.find(item => {
            return !['p', 'c'].some(type => {
                const itemMinMax = item[`${type}Height`]
                const value = sizes[type] && parseInt(sizes[type])

                const minValid = !itemMinMax.min || itemMinMax.min <= value
                const maxValid = !itemMinMax.max || itemMinMax.max >= value

                return !minValid || !maxValid
            })
        })

        setSize(currentSize || { product: 'nosize' })
        setCalculatedSize(true)
    }

    useEffect(() => {
        setShowSizeAlert(['nosize', 'required'].includes(size?.product) || sizes.c && sizes.p && calculatedSize)
    }, [size?.product, sizes?.c, sizes?.p, calculatedSize])

    return (
        <div className='flex flex-col gap-5'>
            <div className='lg:w-[150px]'>
                <Text name='p' label={t('Altezza (cm)')} onChange={onChange} value={`${sizes.p}`} inputType={'number'} />
            </div>
            <div className='lg:w-[150px]'>
                <Text name='c' label={t('Cavallo (cm)')} onChange={onChange} value={`${sizes.c}`} inputType={'number'} />
            </div>
            <div className='lg:w-[150px]'>
                <Button
                    onClick={() => { (sizes.c && sizes.p) && calculate()}}
                    disabled={!(sizes.c && sizes.p)}
                    label={t('Calcola')}
                    variant={2}
                />
            </div>
            <div className='flex min-h-[48px]'>
                <div className={`p-3 rounded flex justify-center min-w-[250px] text-center ${showSizeAlert ? ['nosize', 'required'].includes(size.product) ? 'bg-[#F9E2E2]' : 'bg-[#E3E7E4]' : ''}`}>
                    {showSizeAlert ? ['nosize', 'required'].includes(size.product) ? (
                        <div>{t(size.product === 'nosize' ? 'Nessuna taglia suggerita in base ai valori inseriti' : 'Seleziona una taglia')}</div>
                    ) : (
                        <div>{t('La tua taglia suggerita è')} <span className='style-italic font-bold'>{size.product}</span></div>
                    ) : null}
                </div>
            </div>
            <Products size={size} setSize={item => {
                setSizes({ p: '', c: '' })
                setSize(item)
                setCalculatedSize(false)
            }} />
        </div>
    )
}

export default Calculate
