import React, { ReactNode } from 'react'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'

interface ModalProps {
    body: ReactNode,
    footer: ReactNode,
    showModal: boolean,
    title: string,
    setShowModal: (value: boolean) => any
}

const Modal = ({ showModal, setShowModal, title, body, footer }: ModalProps) => {
    return (
        <div className={`fixed ${showModal ? 'flex' : 'hidden'} flex-col items-center justify-start inset-0 top-0 left-0 right-0 bottom-0`} aria-labelledby='modal-title' role='dialog' aria-modal='true' tabIndex={-1} aria-hidden={!showModal}>
            <div className='absolute w-full h-full bg-black opacity-70'></div>
            <div className='w-full h-full justify-center overflow-y-auto'>
                <div className='flex justify-center w-full'>
                    <div className='w-full max-w-4xl flex-1 h-full py-10'>
                        <div className='transform overflow-hidden px-5 rounded-lg bg-white text-left shadow-xl transition-all sm:my-8'>
                            <div className='modal-header flex pt-4 item-center'>
                                <div className='text-3xl flex-1'>{title}</div>
                                <button onClick={() => setShowModal(false)}>
                                    <Icon path={mdiClose} size={1} />
                                </button>
                            </div>
                            <div className='modal-body py-10'>
                                {body}
                            </div>
                            <div className='modal-footer pb-10'>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
