const OfferHeader = () => {
   return (
      <header
         className="relative h-[300px] bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center bg-cover bg-center"
         style={{
            backgroundImage: 'url(/src/sites/telco/assets/images/privati_banner.png)',
         }}
      >
         <h1 className="text-4xl font-bold text-white">Offerte Privati</h1>
      </header>
   )
}

export default OfferHeader
