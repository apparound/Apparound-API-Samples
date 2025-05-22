import { Card } from '@/components/ui/card'

interface OfferCardProps {
   imageSrc: string
   title: string
   onClick?: () => void
   selected?: boolean
}

const OfferCard: React.FC<OfferCardProps> = ({ imageSrc, title, onClick, selected }) => {
   return (
      <Card
         className={`w-[350px] cursor-pointer transition-shadow shadow-md relative ${
            selected ? 'shadow-[0_0_12px_2px_theme(colors.primary.DEFAULT)]' : 'hover:shadow-lg'
         }`}
         onClick={onClick}
      >
         <h3 className="text-xl font-bold text-primary bg-primary/60 text-white absolute bottom-0 left-0 p-2 z-10 w-full rounded-b-lg">
            {title}
         </h3>
         <img src={imageSrc} alt={title} className="w-full h-48 object-cover rounded-lg" />
      </Card>
   )
}

export default OfferCard
