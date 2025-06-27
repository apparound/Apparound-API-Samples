import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTranslation } from 'react-i18next'

const SelectCap = ({ comuniByProvincia, comuneSelezionato, handleCapChange, isDisabled }) => {
   const { t } = useTranslation()
   const caps = comuniByProvincia.find(comune => comune.nome === comuneSelezionato)?.cap || []

   return (
      <Select name="cap" onValueChange={handleCapChange} disabled={isDisabled}>
         <SelectTrigger>
            <SelectValue placeholder={t('CAP')} />
         </SelectTrigger>
         <SelectContent>
            {caps.map(cap => (
               <SelectItem
                  key={cap}
                  value={cap}
                  className="data-[state=checked]:bg-selected data-[highlighted]:bg-selected"
               >
                  {cap}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

export default SelectCap
