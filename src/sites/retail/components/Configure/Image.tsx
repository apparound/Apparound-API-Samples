import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { mdiRestart } from '@mdi/js'
import { getImageUrl } from '@/utils/utils'
import Button from '@/sites/retail/components/Button'
import useRelativeNavigate from '@/utils/navigate'
import { selectColorProduct, selectMainProduct } from '@/sites/retail/features/quoteSlice'

const Image = () => {
   const navigate = useRelativeNavigate()
   const mainProduct = useSelector(selectMainProduct)
   const colorProduct = useSelector(selectColorProduct)
   const [image, setImage] = useState(mainProduct.icon)
   const { t } = useTranslation()
   useEffect(() => {
      if (colorProduct) {
         setImage(colorProduct.image)
      }
   }, [colorProduct])
   return (
      <div className="flex flex-1 h-full px-10 pt-5 pb-10">
         <div className="flex flex-col w-full h-full items-center overflow-hidden">
            <div className="flex justify-center mb-4 lg:mb-0 lg:justify-start w-full flex-start">
               <Button
                  label={t('Nuova configurazione')}
                  onClick={() => {
                     navigate('/')
                  }}
                  variant={5}
                  leftIcon={{
                     path: mdiRestart,
                     size: 1,
                  }}
               />
            </div>
            <div className="flex-1 items-center justify-center overflow-hidden">
               <img src={getImageUrl(image)} className="w-[100%] h-[100%] object-contain" />
            </div>
            <div className="text-left text-[#9B9B9B] max-w-[700px] text-xs">
               {t(
                  'Il colore visualizzato potrebbe apparire diverso rispetto alla realtà per motivi tecnici. I colori metallici sono particolarmente difficili da rappresentare su uno schermo.'
               )}
            </div>
         </div>
      </div>
   )
}

export default Image
