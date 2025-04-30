import { Card } from '@/components/ui/card'

interface OfferCardProps {
   imageSrc: string
   title: string
   onClick?: () => void
}

const OfferCard: React.FC<OfferCardProps> = ({ imageSrc, title, onClick }) => {
   return (
      <Card className="w-[350px] cursor-pointer hover:shadow-lg transition-shadow shadow-md relative" onClick={onClick}>
         <h3 className="text-xl font-bold text-primary bg-primary/60 text-white absolute bottom-0 left-0 p-2 z-10 w-full rounded-b-lg">
            {title}
         </h3>
         <img src={imageSrc} alt={title} className="w-full h-48 object-cover rounded-lg" />
      </Card>
   )
}

export default OfferCard
