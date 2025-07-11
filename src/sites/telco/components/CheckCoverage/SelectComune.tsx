import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTranslation } from 'react-i18next'

const SelectComune = ({ comuniByProvincia, handleComuneChange, isDisabled }) => {
   const { t } = useTranslation()
   return (
      <Select name="comune" onValueChange={handleComuneChange} disabled={isDisabled}>
         <SelectTrigger>
            <SelectValue placeholder={t('Comune')} />
         </SelectTrigger>
         <SelectContent>
            {comuniByProvincia.map(comune => (
               <SelectItem
                  key={comune.nome}
                  value={comune.nome}
                  className="data-[state=checked]:bg-[#f4f4f4] data-[highlighted]:bg-[#f4f4f4]"
               >
                  {comune.nome}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

export default SelectComune
