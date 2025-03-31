import React, { useEffect, useRef, useState } from 'react'
import Title from './Title'
import Action from './Action'
import { useTranslation } from 'react-i18next'
import { currencyNumberFormat } from '@/utils/utils'

interface CollapsePropsI {
    setShow: any,
    show: boolean,
    isLast: boolean,
    children?: any,
    item: any,
    selectedProduct: any
}

const Collapse = ({ setShow, show, isLast, children, item, selectedProduct }: CollapsePropsI) => {
    const { t } = useTranslation()
    const ref = useRef(null)
    const [maxHeight, setMaxHeight] = useState(0)

    const calculateHeight = () => {
        setMaxHeight(ref.current.scrollHeight)
    }

    useEffect(() => {
        if (ref.current) {
            calculateHeight()
        }

        window.addEventListener('resize', calculateHeight)

        return () => {
            window.removeEventListener('resize', calculateHeight)
        }
    }, [])
    return (
        <div className={`w-full flex flex-col border-[#DCE1E6] border-b-2 ${isLast && show ? 'flex-1' : ''}`}>
            <Title title={item.shortName} info={{
                label: `${selectedProduct ? selectedProduct.label : t('Seleziona')} ${!selectedProduct ? '*' : ''}`,
                info: selectedProduct?.activationPrice ? `+${currencyNumberFormat(selectedProduct.activationPrice )}` : selectedProduct?.activationPrice === 0 ? t('Incluso') : '--'
            }} action={(
                <div className='text-primary'>
                    <Action setShow={setShow} show={show} />
                </div>
            )} />
            <div className='duration-300 block bg-white flex-1 overflow-hidden' style={{
                maxHeight: show ? maxHeight : 0
            }} ref={ref}>
                <div className='border-t border-[#DCE1E6] px-4'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Collapse
