import React from 'react'

const SectionHeader = ({ text }) => {
   return (
      <div className="w-full bg-[#F4F4F4] text-center py-1 mb-5">
         <h2 className="text-primary text-xl font-bold">{text}</h2>
      </div>
   )
}

export default SectionHeader
