import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { showLoader, reset as resetApp, hideLoader } from '@/sites/retail/features/appSlice'
import Title from '@/sites/retail/components/Title'
import Card from '@/sites/retail/components/Card'
import { addProduct, deleteProduct, initQuote } from '@/sites/retail/hooks/apparoundData'
import { reset as resetQuote, selectCart, selectTree } from '@/sites/retail/features/quoteSlize'
import Image from '@/sites/retail/components/Image'
import { currencyNumberFormat, getImageUrl } from '@/utils/utils'
import useRelativeNavigate from '@/utils/navigate'
import {  } from '@/sites/retail/features/appSlice'

const Index = () => {
    const navigate = useRelativeNavigate()
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const tree = useSelector(selectTree)
    const cart = useSelector(selectCart)

    useEffect(() => {
        dispatch(resetQuote())
        dispatch(resetApp())
        dispatch(showLoader())
        initQuote(dispatch)
    }, [])

    useEffect(() => {
        if (tree && tree.length) {
            dispatch(hideLoader())
        } else {
            dispatch(showLoader())
        }
    }, [tree])

    const onClick = async (product: any) => {
        dispatch(showLoader())
        for (const productGuid of Object.keys(cart)) {
            await deleteProduct(productGuid, dispatch)
        }

        await addProduct(product.guid, dispatch)

        dispatch(hideLoader())

        navigate('/calculate')
    }

    return (
        <>
            <Image />
            <div className='container py-10'>
                <div className='flex flex-col gap-10'>
                    <Title title={t('Scegli il modello di base')} size={1} />
                    <div className='grid grid-cols-1 lg:grid-cols-8 gap-10'>
                        {tree ? tree.map((product, index) => {
                            return (
                                <div className={`${!(index % 2) ? 'lg:col-start-2' : ''} col-span-3`} key={product.guid}>
                                    <Card {...{
                                        active: !!cart[product.guid],
                                        info: `${t('da')} ${currencyNumberFormat(product.activationPrice || 0)}`,
                                        image: getImageUrl(product.icon),
                                        title: product.label,
                                        description: product.config[`${i18n.language.startsWith('it-') ? 'it' : 'en'}_descriptionHeadless`],
                                        onClick: () => {
                                            onClick(product)
                                        }
                                    }} />
                                </div>
                            )
                        }) : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index
