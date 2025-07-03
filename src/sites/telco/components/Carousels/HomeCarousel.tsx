import HeroCarousel from './HeroCarousel'
import Banner01 from '@/sites/telco/assets/images/bannerHome01.jpeg'
import Banner02 from '@/sites/telco/assets/images/bannerHome02.jpeg'
import Banner03 from '@/sites/telco/assets/images/bannerHome03.jpeg'

const carouselItems = [
   {
      image: Banner01,
      title: 'WiFi ancora più potente, veloce e sicuro',
   },
   {
      image: Banner02,
      title: 'Naviga senza limiti in 5G',
   },
   {
      image: Banner03,
      title: 'Attivazione semplice e veloce',
   },
]

const HomeCarousel = () => {
   return <HeroCarousel items={carouselItems} />
}

export default HomeCarousel
