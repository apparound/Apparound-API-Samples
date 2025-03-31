import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { config, sizeCalculatorI } from '@/sites/retail/config'
import { selectCart, selectSizeProducts } from '@/sites/retail/features/quoteSlize'
import { hideLoader, showLoader } from '@/sites/retail/features/appSlice'
import { addProduct, deleteProduct } from '@/sites/retail/hooks/apparoundData'
import { useTranslation } from 'react-i18next'
import Button from '@/sites/retail/components/Button'
import useRelativeNavigate from '@/utils/navigate'

interface ProductsPropsI {
    size?: sizeCalculatorI,
    setSize: any
}

const Products = ({ size, setSize }: ProductsPropsI) => {
    const navigate = useRelativeNavigate()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const sizeProducts = useSelector(selectSizeProducts(false))
    const selectedSize = useSelector(selectSizeProducts(true))
    const cart = useSelector(selectCart)
    const [productSelected, setProductSelected] = useState(false)
    const selectProduct = async (product: any) => {
        dispatch(showLoader())
        for (const guid of Object.keys(cart[product.parentGuid])) {
            await deleteProduct(guid, dispatch)
        }
        await addProduct(product.guid, dispatch, product.parentGuid)
        dispatch(hideLoader())
    }

    useEffect(() => {
        if (size) {
            const selectedSize = config.sizeCalculator.find(item => item.product === size?.product)

            if (selectedSize) {
                const product = sizeProducts.find(product => product.label === selectedSize.product)
                if (product) {
                    selectProduct(product)
                }

                setProductSelected(!!product)
            }
        } else {
            setProductSelected(false)
        }
    }, [size])
    return (
        <>
            <div className='flex gap-4'>
                {config.sizeCalculator.map((item, index) => {
                    const isSelected = item.product === size?.product
                    return (
                        <Button
                            onClick={() => setSize(item)}
                            label={t(item.product)}
                            variant={isSelected ? 3 : 4}
                            key={index}
                        />
                    )
                })}
            </div>
            <div className='w-[150px]'>
                <Button
                    onClick={() => {
                        if (!size || size.product === 'nosize') {
                            return setSize({ product: 'required' })
                        }

                        navigate('/configure')
                    }}
                    disabled={!productSelected}
                    label={t('Avanti')}
                />
            </div>
        </>
    )
}

export default Products
