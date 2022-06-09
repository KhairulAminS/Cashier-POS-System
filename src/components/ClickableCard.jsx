import React from 'react'

const ClickableCard = ({ imgSrc, name, price, onClick }) => {

    return (
        <button type='button' className='group rounded-xl hover:drop-shadow-xl hover:scale-110 active:brightness-90 transition-all overflow-hidden bg-red-200 justify-self-center xl:w-5/6 w-56 h-80'
            onClick={onClick}>
            <div className='w-full max-w-xl'>
                <div className='relative aspect-square bg-red-200 '>
                    <img src={imgSrc} className='absolute -top-10 w-full h-full object-cover object-center' />
                </div>
                <div className='p-5 flex flex-col items-start 3xl:flex-row 3xl:justify-between'>
                    <span className='text-xl font-semibold text-overflow'>{name}</span>
                    <span className='text-xl'>{`RM ${price}`}</span>
                </div>
            </div>
        </button>
    )
}

export default ClickableCard