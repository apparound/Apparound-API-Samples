import React from 'react'
import { useTranslation } from 'react-i18next'
import Title from '@/sites/retail/components/Title'
import RetailSizeEng from '@/sites/retail/assets/images/retail_size-eng.png'
import RetailSizeIta from '@/sites/retail/assets/images/retail_size-ita.png'
import CalculateComponent from '@/sites/retail/components/Calculate'
import Button from '@/sites/retail/components/Button'
import { mdiRestart } from '@mdi/js'
import useRelativeNavigate from '@/utils/navigate'
import ConfigureTitle from '@/sites/retail/components/Configure/Title'

const images = {
    it: RetailSizeIta,
    en: RetailSizeEng
}

const Calculate = () => {
    const navigate = useRelativeNavigate()
    const { t, i18n } = useTranslation()

    return (
        <>
            <ConfigureTitle />
            <div className='container py-3'>
                <div className='container'>
                    <div className='flex justify-center mb-5 lg:mb-0 lg:justify-start'>
                        <Button
                            label={t('Nuova configurazione')}
                            onClick={() => {
                                navigate('/')
                            }}
                            variant={5}
                            leftIcon={{
                                path: mdiRestart,
                                size: 1
                            }}
                        />
                    </div>
                </div>
                <div className='mb-10'>
                    <Title title={t('Qual è la tua taglia?')} size={4} />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-20'>
                    <div className='flex justify-center lg:justify-end'>
                        <img src={images[i18n.language.startsWith('it-') ? 'it' : 'en']} className='w-[350px] h-[350px]' />
                    </div>
                    <div className='text-left flex flex-col items-center lg:items-start gap-5'>
                        <div dangerouslySetInnerHTML={{ __html: t('Se non la conosci, ti aiutiamo a scegliere la taglia giusta per la tua nuova bicicletta.<br />Misura la tua altezza e il tuo cavallo e inserisci i valori per calcolare la taglia suggerita.') }} />
                        <CalculateComponent />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calculate
