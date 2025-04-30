import CustomerCard from './CustomerCard'

const Offers = ({ onNavigate }) => {
   return (
      <section className="py-20 px-4">
         <h2 className="text-3xl font-bold text-center text-primary mb-12">Scopri le offerte pensate per te</h2>
         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
            <CustomerCard
               imageSrc="/src/sites/telco/assets/images/privati.png"
               altText="Privati"
               title="PRIVATI"
               onClick={() => onNavigate('/telco/privati')}
            />
            <CustomerCard
               imageSrc="/src/sites/telco/assets/images/business.png"
               altText="Business"
               title="BUSINESS"
               onClick={() => onNavigate('/telco/business')}
            />
         </div>
      </section>
   )
}

export default Offers
