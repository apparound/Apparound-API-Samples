import PrivatoBanner from '@/sites/telco/assets/images/privato_banner.png'
import BusinessBanner from '@/sites/telco/assets/images/business_banner.png'
import { useTranslation } from 'react-i18next'

interface OfferHeaderProps {
   title: string
}

const OfferHeader = ({ title }: OfferHeaderProps) => {
   const { t } = useTranslation()
   const translatedTitle = t(title)
   const isBusiness = translatedTitle === 'Business offers'
   return (
      <header
         className="relative h-[300px] bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center bg-cover bg-center"
         style={{
            backgroundImage: `url(${isBusiness ? BusinessBanner : PrivatoBanner})`,
         }}
      >
         <h1 className="text-4xl font-bold text-white">{translatedTitle}</h1>
      </header>
   )
}

export default OfferHeader
