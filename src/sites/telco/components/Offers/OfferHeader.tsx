import PrivatoBanner from '@/sites/telco/assets/images/privato_banner.png'
import BusinessBanner from '@/sites/telco/assets/images/business_banner.png'
import { useTranslation } from 'react-i18next'

interface OfferHeaderProps {
   title: string
   subtitle?: string
}

const OfferHeader = ({ title, subtitle }: OfferHeaderProps) => {
   const { t } = useTranslation()
   const translatedTitle = t(title)
   const isBusiness = translatedTitle.toLowerCase().includes('business')
   const headerHeight = subtitle ? 'h-[360px]' : 'h-[300px]'
   return (
      <>
         <header
            className={`relative ${headerHeight} bg-gradient-to-r from-purple-600 to-blue-500 flex flex-col items-center justify-center bg-cover bg-center`}
            style={{
               backgroundImage: `url(${isBusiness ? BusinessBanner : PrivatoBanner})`,
            }}
         >
            <h1 className="text-4xl font-bold text-white">{translatedTitle}</h1>
         </header>
         <OfferHeaderFooter subtitle={subtitle} />
      </>
   )
}

const OfferHeaderFooter = ({ subtitle }: { subtitle?: string }) => {
   const hasSubtitle = Boolean(subtitle)
   return (
      <div
         className={`w-full ${
            hasSubtitle ? 'h-[50px]' : 'h-5'
         } bg-gradient-to-r from-[#734F96] via-[#734F96] to-[#0181C4] flex items-center justify-center relative`}
      >
         {hasSubtitle && <div className="text-2xl text-white font-medium max-w-2xl text-center w-full">{subtitle}</div>}
      </div>
   )
}

export default OfferHeader
