interface sizeI {
    min?: number,
    max?: number
}

export interface sizeCalculatorI {
    pHeight: sizeI,
    cHeight: sizeI,
    product: string
}

interface configI {
    cpqId: number,
    sizeCalculator: sizeCalculatorI[],
    mainClusterLabel: string,
    colorClusterLabel: string
}

declare global {
    interface Window { env: any; }
}

const cpqId: number = parseInt(window?.env?.CPQ_RETAIL || import.meta.env.CPQ_RETAIL || 535439)

export const config: configI = {
    cpqId,
    mainClusterLabel: 'Taglie_headless',
    colorClusterLabel: 'Colore_headless',
    sizeCalculator: [
        {
            pHeight: {
                min: 150,
                max: 170
            },
            cHeight: {
                min: 65,
                max: 70
            },
            product: 'XS'
        },
        {
            pHeight: {
                min: 150,
                max: 180
            },
            cHeight: {
                min: 71,
                max: 75
            },
            product: 'S'
        },
        {
            pHeight: {
                min: 161,
                max: 190
            },
            cHeight: {
                min: 75,
                max: 80
            },
            product: 'M'
        },
        {
            pHeight: {
                min: 171,
                max: 190
            },
            cHeight: {
                min: 81,
                max: 85
            },
            product: 'L'
        },
        {
            pHeight: {
                min: 191
            },
            cHeight: {
                min: 86
            },
            product: 'XL'
        }
    ]
}
