import React from 'react'

const ClickableCard = ({ imgSrc, name, price, onClick }) => {

    return (
        <button type='button' className='flex flex-col hover:drop-shadow-xl hover:scale-110 transition-all rounded-2xl active:brightness-90 max-w-5xl justify-self-center'
            onClick={onClick}>
            <img src={imgSrc} className='object-cover w-72 h-56 rounded-t-2xl'/>
            <div className='p-5 flex flex-col items-start gap-2 3xl:flex-row 3xl:items-center 3xl:justify-between'>
                <span className='text-2xl font-semibold overflow-ellipsis overflow-hidden '>{name}</span>
                <span className='text-xl'>{`RM ${price}`}</span>
            </div>
        </button>
    )
}

export default ClickableCard