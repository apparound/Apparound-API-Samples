import { getImageOfProduct } from '@/sites/utilities/hooks/useProducts'
import React, { useEffect, useState } from 'react'

interface ServiceIconProps {
   icon: string
   className?: string
}

const ServiceIcon: React.FC<ServiceIconProps> = ({ icon, className }) => {
   const [iconUrl, setIconUrl] = useState<string | null>(null)
   const [loading, setLoading] = useState<boolean>(true)

   useEffect(() => {
      const fetchImage = async () => {
         setLoading(true)
         try {
            const image = await getImageOfProduct([icon])

            if (image && image.length === 1 && image[0] instanceof Blob) {
               const url = URL.createObjectURL(image[0])
               setIconUrl(url)

               return () => {
                  URL.revokeObjectURL(url)
               }
            } else {
               setIconUrl(`data:image/png;base64,${image[0]}`)
            }
         } catch (error) {
            console.error('Error fetching image:', error)
         } finally {
            setLoading(false)
         }
      }

      fetchImage()
   }, [icon])

   if (loading) {
      return <div className={`loader ${className}`}>Loading...</div>
   }

   if (!iconUrl) {
      return null
   }

   return <img src={iconUrl} alt="" className={className} />
}

export default ServiceIcon
