import * as Toast from '@radix-ui/react-toast'
import { useTranslation } from 'react-i18next'

const ErrorToast = ({ showErrorToast, setShowErrorToast, errorMessage }) => {
   const { t } = useTranslation()

   return (
      <Toast.Provider swipeDirection="right">
         <Toast.Root
            open={showErrorToast}
            onOpenChange={setShowErrorToast}
            className="bg-white rounded-lg shadow-lg p-4"
         >
            <Toast.Title>{t('Errore')}</Toast.Title>
            <Toast.Description>
               {errorMessage}
            </Toast.Description>
            <Toast.Action asChild altText="Close">
               <button onClick={() => setShowErrorToast(false)}>OK</button>
            </Toast.Action>
         </Toast.Root>
         <Toast.Viewport className="fixed bottom-0 right-0 p-4" />
      </Toast.Provider>
   )
}

export default ErrorToast
