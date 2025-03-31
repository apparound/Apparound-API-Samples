import { useTranslation } from 'react-i18next'

const Title = ({ textKey }) => {
   const { t } = useTranslation()
   return <h1 className="text-3xl font-bold text-center mb-2 text-primary">{t(textKey)}</h1>
}

export default Title
