import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Banner01 from '@/sites/telco/assets/images/banner01.png'
import Banner02 from '@/sites/telco/assets/images/banner02.png'
import Banner03 from '@/sites/telco/assets/images/banner03.png'

const carouselItems = [
   {
      image: Banner01,
      title: 'WiFi ancora più potente, veloce e sicuro',
   },
   {
      image: Banner02,
      title: 'Connettività senza limiti',
   },
   {
      image: Banner03,
      title: 'Tecnologia all’avanguardia',
   },
]

const HeroCarousel = () => {
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
                  delay: 10000,
               }),
            ]}
         >
            <CarouselContent>
               {carouselItems.map((item, index) => (
                  <CarouselItem key={index} className="h-[500px] max-h-[500px]">
                     <div className="h-[400px] max-h-[400px]">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                     </div>
                     <div className="h-[100px] max-h-[100px] flex items-center text-white bg-gradient-to-t from-black/50 to-transparent ">
                        <h1 className="text-4xl font-bold ml-8">{item.title}</h1>
                     </div>
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious className="text-white" />
            <CarouselNext className="text-white" />
         </Carousel>
      </section>
   )
}

export default HeroCarousel
