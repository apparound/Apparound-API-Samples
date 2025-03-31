import React from 'react'
import Icon from '@mdi/react'

interface iconI {
    path: string,
    size: number|string,
    className?: string
}

interface ButtonI {
    disabled?: boolean,
    label?: string,
    variant?: number,
    onClick: any,
    leftIcon?: iconI,
    rightIcon?: iconI,
    full?: boolean,
    auto?: boolean
}

interface variantsI {
    [key: number]: string
}

const variants: variantsI = {
    1: 'w-[150px] h-[38px] text-white font-medium bg-primary disabled:opacity-50 uppercase rounded',
    2: 'w-[150px] h-[38px] text-primary font-medium border-2 border-primary disabled:opacity-50 uppercase rounded',
    3: 'w-[50px] h-[50px] border-[3px] border-primary rounded-[4px] bg-primary/20',
    4: 'w-[50px] h-[50px] border-[3px] border-[#DCE1E6] rounded-[3px] hover:border-[3px] hover:border-primary transition duration-300',
    5: 'font-medium text-primary',
    6: 'w-[30px] h-[30px]'
}

const Button = ({ disabled, label, variant = 1, onClick, leftIcon, rightIcon, full, auto }: ButtonI) => {
    return (
        <button className={`block ${auto ? '!w-auto px-4' : ''} ${full ? 'w-full' : ''} ${variants[variant || 1] || variants[1]} ${disabled ? 'opacity-50' : ''}`} onClick={onClick}>
            <div className='flex gap-1 items-center'>
                {leftIcon ? (
                    <Icon {...leftIcon} />
                ) : null}
                {label ? (
                    <div className='w-full text-center'>
                        {label}
                    </div>
                ) : null}
                {rightIcon ? (
                    <Icon {...rightIcon} />
                ) : null}
            </div>
        </button>
    )
}

export default Button
