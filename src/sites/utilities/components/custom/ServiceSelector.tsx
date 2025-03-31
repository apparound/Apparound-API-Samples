import { useEffect, useState } from 'react'
import ServiceIcon from './ServiceIcon'

export interface Service {
   productId: number
   icon?: string
   label: string
   tofProductId?: number
   uniqueId?: string
   clusterId?: number
   descriptionHeadless?: string
}

interface ServiceSelectorProps {
   selected: number[]
   services: Service[]
   onSelectService: (service: Service) => void
}

export const ServiceSelector = ({ selected, services, onSelectService }: ServiceSelectorProps) => {
   let isSelectedArray = true
   try {
      if (!Array.isArray(selected)) {
         throw new Error('Selected is not an array')
      }
   } catch (error) {
      console.error(error.message)
      isSelectedArray = false
   }

   const [servicesKey, setServicesKey] = useState(services.map(s => s.productId).join('-'))

   useEffect(() => {
      setServicesKey(services.map(s => s.productId).join('-'))
   }, [services])

   return (
      <div key={servicesKey} className="flex service-selector">
         {isSelectedArray &&
            services.map(service => {
               const iconName = service.icon ? encodeURIComponent(service.icon.split('/').pop() || '') : ''
               return (
                  <div
                     key={service.productId}
                     className={`service-option ${selected.includes(service.productId) ? 'selected' : ''}`}
                     onClick={() => onSelectService(service)}
                     style={{ width: '100%', maxWidth: '200px' }}
                  >
                     <div className="w-full lg:w-40 pt-[100%] relative">
                        {service.icon && (
                           <ServiceIcon
                              icon={iconName}
                              className="w-full h-full object-contain absolute top-0 left-0 right-0 bottom-0 p-3"
                           />
                        )}
                     </div>
                     <span className="text-lg font-medium text-primary">{service.label}</span>
                     {service.descriptionHeadless && (
                        <p className="text-xs text-primary-text">{service.descriptionHeadless}</p>
                     )}
                  </div>
               )
            })}
      </div>
   )
}

export default ServiceSelector
