import Navbar from '@/sites/telco/components/Navbar'
import Offers from '@/sites/telco/components/Offers'
import { useNavigate } from 'react-router-dom'
import HeroCarousel from '@/sites/telco/components/HeroCarousel'
import Footer from '@/components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { reset as resetQuote, selectCart, selectTree } from '@/sites/retail/features/quoteSlice'
import { showLoader, reset as resetApp } from '@/sites/retail/features/appSlice'
import { initQuote } from '@/sites/telco/hooks/apparoundData'

const Index = () => {
   const navigate = useNavigate()

   const dispatch = useDispatch()
   const tree = useSelector(selectTree)
   const cart = useSelector(selectCart)

   useEffect(() => {
      dispatch(resetQuote())
      dispatch(resetApp())
      dispatch(showLoader())
      initQuote(dispatch)
   }, [])

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
