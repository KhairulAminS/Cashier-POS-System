import React from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'

const Paid = ({ t }) => {
    return (
        <div className={`${t.visible ? 'animate-slideIn' : 'animate-leave'} flex px-10 py-5 bg-green-400 text-green-800 rounded-xl text-2xl font-semibold space-x-5`} >
            <div className='flex items-center text-3xl text-white'>
                <BsCheckCircleFill />
            </div>
            <span>Transaction completed!</span>
        </div>
    )
}

export default Paid