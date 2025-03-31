import { useTranslation } from 'react-i18next'

const SectionTitle = ({ textKey }) => {
   const { t } = useTranslation()
   return <h2 className="text-lg font-bold text-primary-text">{t(textKey)}</h2>
}

export default SectionTitle
