import Icon from '@mdi/react'
import * as mdiIcons from '@mdi/js'

const iconMap: Record<string, string> = {
   modem: 'mdiRouterWireless',
   portabilità: 'mdiSwapHorizontal',
   '5g': 'mdiSignal',
   'sim/esim': 'mdiSim',
   terminali: 'mdiDeskphone',
   postazioni: 'mdiDesk',
   server: 'mdiServer',
   videosorveglianza: 'mdiCctv',
   'assistenza plus': 'mdiShieldHome',
   'protezione rete fissa': 'mdiPhone',
}

const DEFAULT_SIZE_CLASS = 'w-8 h-8'

interface ProductIconProps {
   name?: string
   iconName?: string
   sizeClass?: string
}

class ProductIcon {
   static get({ name, iconName, sizeClass = DEFAULT_SIZE_CLASS }: ProductIconProps) {
      let path: string | null = null
      if (iconName) {
         path = mdiIcons[iconName] || null
      } else if (name) {
         const foundKey = Object.keys(iconMap).find(key => name.toLowerCase().includes(key.toLowerCase()))
         const iconKey = foundKey ? iconMap[foundKey] : undefined
         path = iconKey ? mdiIcons[iconKey] : null
      }
      const colorClass = 'text-primary'
      if (!path) return <div className={`flex items-center justify-center ${sizeClass} ${colorClass}`} />
      return <Icon path={path} className={`${sizeClass} ${colorClass}`} />
   }

   static getByIconName(iconName: string, sizeClass = DEFAULT_SIZE_CLASS) {
      return ProductIcon.get({ iconName, sizeClass })
   }

   static getByName(name: string, sizeClass = DEFAULT_SIZE_CLASS) {
      return ProductIcon.get({ name, sizeClass })
   }
}

export default ProductIcon
