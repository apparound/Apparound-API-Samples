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
}

class ProductIcon {
   static get(name: string, size = 1.4, color = '#7c4bc6') {
      const iconKey = iconMap[name]
      const path = iconKey ? mdiIcons[iconKey] : null
      if (!path) return null
      return <Icon path={path} size={size} color={color} />
   }
}

export default ProductIcon
