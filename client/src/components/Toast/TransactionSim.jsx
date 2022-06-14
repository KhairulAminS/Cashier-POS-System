import React from 'react'
import { RiInformationFill } from 'react-icons/ri'

const TransactionSim = ({ t }) => {
    return (
        <div className={`${t.visible ? 'animate-slideIn' : 'animate-leave'} flex px-10 py-5 bg-blue-500 rounded-xl relative overflow-hidden`}>
            <div className='flex text-white text-2xl font-semibold space-x-5 pb-2' >
                <div className='flex items-center text-3xl'>
                    <RiInformationFill />
                </div>
                <span>Simulating transaction process!</span>
            </div>
            <div className='absolute w-full h-2 bottom-0 left-0 bg-blue-800 animate-slideLeft' />
        </div>
    )
}

export default TransactionSim