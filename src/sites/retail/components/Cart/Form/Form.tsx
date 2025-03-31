import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import FormComponent from '@/sites/retail/components/Form'
import contractDataSchema from '@/sites/retail/models/contractData'
import Footer from './Footer'
import { selectContractProperties, selectCustomer, updateContractProperties, updateCustomer } from '@/sites/retail/features/quoteSlize'
import { getShippingDate } from '@/utils/utils'

interface itemI {
    [key: string]: any
}

const Form = ({}) => {
    const { t, i18n } = useTranslation()

    const dispatch = useDispatch()

    const formRef = useRef(null)

    const contractData: itemI = useSelector(selectContractProperties)
    const customerData: itemI = useSelector(selectCustomer)

    const [copy, setCopy] = useState<boolean>(false)
    const [copyItems, setCopyItems] = useState<itemI>({})

    const shippingDate = getShippingDate(i18n)

    const onChange = (value, name, item: itemI) => {
        const tmpObj = { ...contractData }
        if (item.copy) {
            setCopyItems(item.copy)
            setCopy(value)
        } else {
            if (item.mapToCustomer) {
                dispatch(updateCustomer({
                    ...customerData,
                    [item.mapToCustomer]: value
                }))
            }

            tmpObj[name] = value

            if (copy) {
                tmpObj[copyItems[name]] = value || null
            }
        }

        dispatch(updateContractProperties(tmpObj))
    }

    useEffect(() => {
        if (copyItems) {
            const tmpObj: itemI = { ...contractData }
            Object.entries(copyItems).forEach(([from, to]) => {
                tmpObj[to] = copy ? contractData[from] || null : undefined
            })
            dispatch(updateContractProperties(tmpObj))
        }
    }, [copy])

    return (
        <div className='lg:grid lg:grid-cols-12 text-left'>
            <form className='col-span-8 col-start-3 flex flex-col gap-10' ref={formRef}>
                <FormComponent children={contractDataSchema} values={contractData} onChange={onChange} />
                <div className='flex py-4 px-7 bg-primary/20 rounded-[4px] text-lg'>
                    <div className='flex-1 text-left italic'>{t('Consegna stimata')}</div>
                    <div className='font-bold'>{shippingDate}</div>
                </div>
                <Footer formRef={formRef} />
            </form>
        </div>
    )
}

export default Form
