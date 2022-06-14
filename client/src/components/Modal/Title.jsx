import React from 'react'
import { MdOutlineClose } from 'react-icons/md'

const Title = ({closeModal}) => {
    return (
        <div className='grid grid-cols-4 h-20 items-center just'>

            <span className='text col-span-2 col-start-2 text-3xl font-bold justify-self-center'>
                Check Out
            </span>

            <button
                type='button'
                className='justify-self-end self-start text-4xl text-gray-400 bg-white p-1 rounded-xl hover:drop-shadow-xl'
                onClick={closeModal}>
                <MdOutlineClose />
            </button>

        </div>
    )
}

export default Title