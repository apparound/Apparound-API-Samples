import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { mdiArrowLeft } from '@mdi/js'
import useRelativeNavigate from '@/utils/navigate'
import Button from '@/sites/retail/components/Button'
import { selectMainProduct, selectQuote } from '@/sites/retail/features/quoteSlize'

const Title = () => {
    const { t } = useTranslation()
    const navigate = useRelativeNavigate()
    const mainProduct = useSelector(selectMainProduct)
    const quote = useSelector(selectQuote)
    return (
        <div className='flex flex-col-reverse lg:flex-row pb-5 border-b border-[#ccc]'>
            <div className='flex-1 text-left'>
                <div className='text-2xl font-bold'>{mainProduct.label}</div>
                {quote.quoteNumber ? (<div>{t('ID configurazione')} {quote.quoteNumber}</div>) : null}
            </div>
            {!quote.quoteNumber ? (
                <div>
                    <Button
                        label={t('Modifica selezioni')}
                        onClick={() => {
                            navigate('/configure')
                        }}
                        variant={5}
                        leftIcon={{
                            path: mdiArrowLeft,
                            size: '30px'
                        }}
                    />
                </div>
            ) : null}
        </div>
    )
}

export default Title
