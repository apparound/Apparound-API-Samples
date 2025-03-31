import React from 'react'
import Button from '@/sites/retail/components/Button'
import { mdiChevronDown } from '@mdi/js'
import { mdiChevronUp } from '@mdi/js'

interface ActionPropsI {
    setShow: any,
    show: boolean
}

const Action = ({ setShow, show }: ActionPropsI) => {
    return (
        <Button
            leftIcon={{
                path: mdiChevronDown,
                size: 1,
                className: `duration-300 ${show ? '-scale-y-100' : ''}`
            }}
            variant={6}
            onClick={() => { setShow(!show) }}
        />
    )
}

export default Action
