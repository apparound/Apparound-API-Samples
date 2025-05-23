import React from 'react'

interface CustomerCardProps {
   imageSrc: string
   altText: string
   title: string
   onClick: () => void
}

const CustomerCard: React.FC<CustomerCardProps> = ({ imageSrc, altText, title, onClick }) => {
   return (
      <div className="relative overflow-hidden group cursor-pointer h-full flex flex-col" onClick={onClick}>
         <div className="absolute inset-0 group-hover:opacity-75 transition-opacity" />
         <img
            src={imageSrc}
            alt={altText}
            className="w-auto h-auto max-w-full max-h-full object-contain flex-grow max-w-[400px] mx-auto"
         />
         <div className="p-6">
            <h3 className="text-2xl font-bold text-primary">{title}</h3>
         </div>
      </div>
   )
}

export default CustomerCard
