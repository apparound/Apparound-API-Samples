import { getAllMainProductsIds } from '@/utils/treeManager'
import React, { createContext, useContext, useState, useEffect } from 'react'

const ConsumptionContext = createContext(null)

export const useConsumption = () => useContext(ConsumptionContext)

export const ConsumptionProvider = ({ children }) => {
   const [selectedServices, setSelectedServices] = useState(() => {
      const savedServices = getAllMainProductsIds()
      return savedServices ? savedServices : []
   })
   const [surfaceArea, setSurfaceArea] = useState(() => {
      return localStorage.getItem('surfaceArea') || '60-80'
   })
   const [selectedHouseHeatingType, setselectedHouseHeatingType] = useState(() => {
      return localStorage.getItem('selectedHouseHeatingType') || ''
   })
   const [selectedWaterHeatingType, setselectedWaterHeatingType] = useState(() => {
      return localStorage.getItem('selectedWaterHeatingType') || ''
   })

   useEffect(() => {
      localStorage.setItem('selectedServices', JSON.stringify(selectedServices))
   }, [selectedServices])

   useEffect(() => {
      localStorage.setItem('surfaceArea', surfaceArea)
   }, [surfaceArea])

   useEffect(() => {
      localStorage.setItem('selectedHouseHeatingType', selectedHouseHeatingType)
   }, [selectedHouseHeatingType])

   useEffect(() => {
      localStorage.setItem('selectedWaterHeatingType', selectedWaterHeatingType)
   }, [selectedWaterHeatingType])

   return (
      <ConsumptionContext.Provider
         value={{
            selectedServices,
            setSelectedServices,
            surfaceArea,
            setSurfaceArea,
            selectedHouseHeatingType,
            setselectedHouseHeatingType,
            selectedWaterHeatingType,
            setselectedWaterHeatingType,
         }}
      >
         {children}
      </ConsumptionContext.Provider>
   )
}
