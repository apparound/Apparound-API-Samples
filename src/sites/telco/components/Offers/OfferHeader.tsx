import PrivatoBanner from '@/sites/telco/assets/images/privato_banner.png'

interface OfferHeaderProps {
   title: string
}

const OfferHeader = ({ title }: OfferHeaderProps) => {
   return (
      <header
         className="relative h-[300px] bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center bg-cover bg-center"
         style={{
            backgroundImage: `url(${PrivatoBanner})`,
         }}
      >
         <h1 className="text-4xl font-bold text-white">{title}</h1>
      </header>
   )
}

export default OfferHeader
