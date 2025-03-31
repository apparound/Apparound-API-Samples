import { useTranslation } from 'react-i18next'

const SectionSubtitle = ({ textKey }) => {
   const { t } = useTranslation()
   return <h3 className="text-md font-medium mb-2 text-gray-600">{t(textKey)}</h3>
}

export default SectionSubtitle
