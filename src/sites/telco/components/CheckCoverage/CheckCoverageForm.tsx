import SelectProvincia from './SelectProvincia'
import SelectComune from './SelectComune'
import SelectCap from './SelectCap'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

const CheckCoverageForm = ({
   province,
   comuniByProvincia,
   formData,
   handleProvinceChange,
   handleComuneChange,
   handleCapChange,
   handleInputChange,
   handleSubmit,
}) => {
   const { t } = useTranslation()
   return (
      <form className="space-y-4" onSubmit={handleSubmit}>
         <div className="grid md:grid-cols-3 gap-4">
            <SelectProvincia province={province} handleProvinceChange={handleProvinceChange} />
            <SelectComune
               comuniByProvincia={comuniByProvincia}
               handleComuneChange={handleComuneChange}
               isDisabled={!formData.provincia}
            />
            <SelectCap
               comuniByProvincia={comuniByProvincia}
               comuneSelezionato={formData.comune}
               handleCapChange={handleCapChange}
               isDisabled={!formData.comune}
            />
            <Input name="indirizzo" placeholder={t('Indirizzo e numero civico')} onChange={handleInputChange} />
         </div>
         <Button
            type="submit"
            className="mx-4 my-4 w-[80%] max-w-[250px] bg-white border-2 border-primary text-primary hover:bg-purple-700 hover:text-white rounded-3xl px-6"
            disabled={!(formData.provincia && formData.comune && formData.cap && formData.indirizzo)}
         >
            {t('Verifica copertura').toUpperCase()}
         </Button>
      </form>
   )
}

export default CheckCoverageForm
