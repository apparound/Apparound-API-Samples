import HeroCarousel from './HeroCarousel'
import Slider01 from '@/sites/telco/assets/images/slider01.jpeg'
import Slider02 from '@/sites/telco/assets/images/slider02.jpeg'
import Slider03 from '@/sites/telco/assets/images/slider03.jpeg'

const carouselItems = [
   {
      image: Slider01,
      title: "Scarica l'app per gestire la tua offerta",
   },
   {
      image: Slider02,
      title: 'Tariffe trasparenti, senza costi nascosti',
   },
   {
      image: Slider03,
      title: 'Assistenza rapida, sempre disponibile',
   },
]

const OfferHomeCarousel = () => {
   return <HeroCarousel items={carouselItems} />
}

export default OfferHomeCarousel
