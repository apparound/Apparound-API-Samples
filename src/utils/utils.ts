import { SERVER_URL } from './fetcher'
import { DateTime } from 'luxon'

interface ExtendedNumberFormatOptions extends Intl.NumberFormatOptions {
    trailingZeroDisplay?: 'auto'| 'stripIfInteger'
}

export const currencyNumberFormat = (value: number|string) => {
    const tmpNumber = (Intl.NumberFormat('IT-it', {
        style: 'currency',
        currency: 'EUR',
        trailingZeroDisplay: 'stripIfInteger'
    } as ExtendedNumberFormatOptions)).format(parseFloat(`${value}`) || 0)

    return tmpNumber
}

export const getImageUrl = (image: string) => {
    const sessionId = localStorage.getItem('sessionId')

    return `${SERVER_URL}/getImage?fileName=${image?.split('/').pop()}&sessionId=${sessionId}`
}

export const getPdfUrl = () => {
    const sessionId = localStorage.getItem('sessionId')

    return `${SERVER_URL}/getPdfQuote?sessionId=${sessionId}`
}

export const getShippingDate = (i18n: any) => {
    return DateTime.now().plus({ days: 30 }).setLocale(i18n.language.startsWith('it-') ? 'it' : 'en').toFormat('dd MMMM')
}
