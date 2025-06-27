import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useTranslation } from 'react-i18next'

interface CarouselItemType {
   image: string
   title: string
}

interface HeroCarouselProps {
   items: CarouselItemType[]
}

const HeroCarousel = ({ items }: HeroCarouselProps) => {
   const { t } = useTranslation()

   return (
      <section className="relative h-[500px] max-h-[500px] bg-gradient-to-r from-purple-600 to-blue-500 overflow-auto">
         <Carousel
            className="h-[500px] max-h-[500px] border-[#DCE1E6] border-b-2"
            opts={{
               align: 'start',
               loop: true,
            }}
            plugins={[
               Autoplay({
                  delay: 5000,
               }),
            ]}
         >
            <CarouselContent>
               {items.map((item, index) => (
                  <CarouselItem key={index} className="h-[500px] max-h-[500px]">
                     <div className="h-[400px] max-h-[400px]">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                     </div>
                     <div className="h-[100px] max-h-[100px] flex items-center text-white bg-gradient-to-r from-[#734F96] via-[#734F96] to-[#0181C4] ">
                        <h1 className="text-2xl md:text-4xl font-bold mx-8">{t(item.title)}</h1>
                     </div>
                  </CarouselItem>
               ))}
            </CarouselContent>
         </Carousel>
      </section>
   )
}

export default HeroCarousel
