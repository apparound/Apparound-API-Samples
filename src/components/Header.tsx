import React from 'react'
import Logo from '@/assets/images/logo.png'
import Button from '@/sites/retail/components/Button'
import { mdiInformation } from '@mdi/js'
import { useTranslation } from 'react-i18next'

interface HeaderPropsI {}

const Header = ({}: HeaderPropsI) => {
    const { t } = useTranslation()
    return (
        <div className='border-b-2 border-[#DCE1E6]'>
            <div className='flex justify-between items-center relative'>
                <button onClick={() => {}}>
                    <img className='h-16' src={Logo} />
                </button>
                <div className='px-6 z-20'>
                    <Button
                        onClick={() => {
                            window.open(
                                'https://www.apparound.com/it/demo',
                                '_blank'
                            )
                        }}
                        variant={5}
                        label={t('Contattaci per info')}
                        leftIcon={{
                            path: mdiInformation,
                            size: '24px'
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header
