import React from 'react'

const ClickableCard = ({ imgSrc, name, price, onClick }) => {

    return (
        <button type='button' className='rounded-xl hover:drop-shadow-xl hover:scale-110 active:brightness-90 transition-all overflow-hidden  h-80 w-60 xl:w-48 xl:h-[17rem] bg-white justify-self-center'
            onClick={onClick}>
            <div className='h-full w-full'>
                <div className='relative aspect-square'>
                    <img src={imgSrc} className='absolute w-full h-full object-cover object-center' />
                </div>
                <div className='flex flex-col items-start 2xl:flex-row 2xl:justify-between px-6 pt-3 xl:pt-[0.6rem] xl:p-6 '>
                    <span className='text-xl font-semibold text-overflow'>{name}</span>
                    <span className='text-xl'>{`RM ${parseFloat(price).toFixed(2)}`}</span>
                </div>
            </div>
        </button>
    )
}

export default ClickableCard