import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@/sites/retail/components/Button'

interface FooterProps {
    formIsValid: boolean
    setShowModal: (value: boolean) => any
    onSubmit: () => any
}

const Footer = ({ setShowModal, formIsValid, onSubmit }: FooterProps) => {
    const { t } = useTranslation()
    return (
        <div className="flex w-full justify-between">
            <Button
                onClick={() => setShowModal(false)}
                label={t('Annulla')}
                variant={2} />
            <Button
                disabled={!formIsValid}
                onClick={() => formIsValid && onSubmit()}
                label={t('Continua')} />
        </div>
    )
}

export default Footer
