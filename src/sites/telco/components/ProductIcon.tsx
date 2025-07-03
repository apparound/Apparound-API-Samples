import Icon from '@mdi/react'
import * as mdiIcons from '@mdi/js'

const DEFAULT_SIZE_CLASS = 'w-8 h-8'

interface ProductIconProps {
   name?: string
   iconName?: string
   sizeClass?: string
}

class ProductIcon {
   static get({ iconName, sizeClass = DEFAULT_SIZE_CLASS }: ProductIconProps) {
      let path: string | null = null
      if (iconName) {
         path = mdiIcons[iconName] || null
      }
      const colorClass = 'text-primary'
      if (!path) return <div className={`flex items-center justify-center ${sizeClass} ${colorClass}`} />
      return <Icon path={path} className={`${sizeClass} ${colorClass}`} />
   }

   static getByIconName(iconName: string, sizeClass = DEFAULT_SIZE_CLASS) {
      return ProductIcon.get({ iconName, sizeClass })
   }
}

export default ProductIcon
