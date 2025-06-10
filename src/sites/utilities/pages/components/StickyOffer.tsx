import Offer from '@/sites/utilities/components/custom/CartSignature/Offer'
import { Button } from '@/sites/utilities/components/ui/button'
import { SERVER_URL } from '@/sites/utilities/hooks/use-apparound-data'
import { ApparoundData } from '@/sites/utilities/hooks/use-apparound-data'

const StickyOffer = ({ t }) => (
   <div className="col-span-1 lg:col-span-2">
      <div className="sticky top-0 bottom-0 mb-10">
         <Offer className="w-full" hideTitle={false}>
            <Button
               onClick={() =>
                  window.open(
                     `${SERVER_URL}/apparoundimages/v2/quote/${new ApparoundData().getQuoteId()}/pdf`,
                     '_blank'
                  )
               }
               className="bg-white border-2 border-primary hover:border-primary-dark text-primary font-medium px-5 rounded-full shadow-md hover:shadow-lg transition-all uppercase"
            >
               {t('Visualizza PDF offerta').toUpperCase()}
            </Button>
         </Offer>
         <p className="text-gray-400 text-left text-xs mt-6">
            {t('Prezzi stimati in base alle informazioni che ci hai fornito per calcolare i tuoi consumi in media.')}
            <br />
            {t('Importi reali da corrispondere')}
         </p>
      </div>
   </div>
)

export default StickyOffer
