import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/sites/utilities/components/ui/button'

interface FooterProps {
   formIsValid: boolean
   setShowModal: (value: boolean) => any
   onSubmit: () => any
}

const Footer = ({ setShowModal, onSubmit }: FooterProps) => {
   const { t } = useTranslation()
   return (
      <div className="flex w-full justify-between">
         <Button
            onClick={() => setShowModal(false)}
            className="bg-white border-2 border-primary hover:border-primary-dark text-primary font-medium px-5 rounded-full shadow-md hover:shadow-lg transition-all uppercase"
         >
            {t('Annulla')}
         </Button>
         <Button
            onClick={() => onSubmit()}
            className="bg-primary hover:bg-primary-dark text-white font-medium px-5 rounded-full shadow-md hover:shadow-lg transition-all uppercase"
         >
            {t('Continua')}
         </Button>
      </div>
   )
}

export default Footer
