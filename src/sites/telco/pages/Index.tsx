import Navbar from '@/sites/telco/components/Navbar'
import Offers from '@/sites/telco/components/Offers'
import { useNavigate } from 'react-router-dom'
import HeroCarousel from '@/sites/telco/components/HeroCarousel'
import Footer from '@/components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const Index = () => {
   const navigate = useNavigate()

   return (
      <div className="min-h-screen bg-white flex flex-col">
         <Navbar />
         <HeroCarousel />
         <Offers onNavigate={navigate} />

         <Footer />
      </div>
   )
}

export default Index
