import { Card } from '@/components/ui/card'
import cardBottom from '@/sites/telco/assets/misc/cardBottom.png'
import Spinner from '@/components/Spinner'

interface OfferCardProps {
   imageSrc: string
   title: string
   onClick?: () => void
   selected?: boolean
   loading?: boolean
}

const OfferCard: React.FC<OfferCardProps> = ({ imageSrc, title, onClick, selected, loading }) => {
   return (
      <Card
         className={`w-[350px] cursor-pointer relative rounded-2xl border-0 shadow-kiki-shadow ${
            selected ? 'shadow-kiki-shadow' : 'shadow-kiki-shadow hover:shadow-lg'
         }`}
         onClick={onClick}
      >
         {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20 rounded-2xl">
               <Spinner />
            </div>
         )}
         <img
            src={cardBottom}
            alt="Card Bottom"
            className="absolute bottom-0 left-0 w-full object-fit rounded-b-2xl shadow-kiki-shadow"
            style={{ pointerEvents: 'none' }}
         />
         <h3 className="text-xl font-bold text-primary text-white absolute bottom-0 left-0 p-2 z-10 w-full rounded-xl">
            {title}
         </h3>
         <img src={imageSrc} alt={title} className="w-full h-48 object-cover rounded-2xl" />
      </Card>
   )
}

export default OfferCard
