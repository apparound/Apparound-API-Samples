import React from 'react'
import { getImageOfProduct } from '@/sites/utilities/hooks/useProducts'

interface ProductListElementProps {
   id: number
   imageSrc: string
   title: string
   subtitle?: string
   price: string
}

const ProductListElement: React.FC<ProductListElementProps> = ({ id, imageSrc, title, subtitle, price }) => {
   const [image, setImage] = React.useState<string>('')

   React.useEffect(() => {
      if (!imageSrc) return
      const fetchImage = async () => {
         try {
            const imageName = imageSrc.split('/').pop() || imageSrc
            const images: Blob[] = await getImageOfProduct([imageName])
            const imageBlob = images[0]
            const imageObjectURL = URL.createObjectURL(imageBlob)
            setImage(imageObjectURL)
         } catch (error) {
            console.error('Error creating image URL:', error)
         }
      }
      fetchImage()
   }, [imageSrc])

   return (
      <div key={id} className="flex items-center">
         <div className={`w-16 h-16 mr-4`}>
            {image && <img src={image} alt={title} className="w-16 h-16 object-cover rounded-lg" />}
         </div>
         <div className="flex-1 text-left">
            <div className="text-lg font-base">{title}</div>
            {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
         </div>
         {price !== '0' && <div className="text-lg font-base text-right">{price}</div>}
      </div>
   )
}

export default ProductListElement
