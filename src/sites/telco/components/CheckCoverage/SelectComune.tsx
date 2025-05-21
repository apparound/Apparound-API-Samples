import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const SelectComune = ({ comuniByProvincia, handleComuneChange, isDisabled }) => {
   return (
      <Select name="comune" onValueChange={handleComuneChange} disabled={isDisabled}>
         <SelectTrigger>
            <SelectValue placeholder="Comune" />
         </SelectTrigger>
         <SelectContent>
            {comuniByProvincia.map(comune => (
               <SelectItem key={comune.nome} value={comune.nome}>
                  {comune.nome}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

export default SelectComune
