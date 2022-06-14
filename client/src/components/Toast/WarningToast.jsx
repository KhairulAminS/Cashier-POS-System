import React from 'react'
import { IoMdWarning } from 'react-icons/io'

const WarningToast = ({t}) => {
    return (
        <div className={`${t.visible ? 'animate-slideIn' : 'animate-leave'} flex px-10 py-5 bg-orange-400 text-white rounded-xl text-2xl font-semibold space-x-5`} >
            <div className='flex items-center text-3xl'>
                <IoMdWarning />
            </div>
            <span>Your cart is empty!</span>
        </div>
    )
}

export default WarningToast