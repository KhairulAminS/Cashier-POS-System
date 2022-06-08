import React from 'react'
import { HiPlus, HiMinus } from 'react-icons/hi';

const ItemList = ({ items, onIncr, onDecr }) => {
    return (
        <div className='grid grid-cols-4 gap-5 p-5 items-center'>

            <span className='col-span-1 text-xl font-semibold'>
                {items.productName}
            </span>

            <span className='col-span-1 text-center text-lg font-semibold'>
                {items.price}
            </span>

            <div className='flex space-x-6 col-span-1 px-5 justify-center'>

                <button type='button' className='rounded-xl bg-red-200 p-3 text-xl hover:drop-shadow-lg active:brightness-90'
                    onClick={onDecr}>
                    <HiMinus />
                </button>

                <span className='text-lg font-semibold self-center'>
                    {items.quantity}
                </span>

                <button type='button' className='rounded-xl bg-green-200 p-3 text-xl hover:drop-shadow-lg active:brightness-90'
                    onClick={onIncr}>
                    <HiPlus />
                </button>
            </div>

            <span className='col-span-1 text-center text-lg font-semibold'>
                {items.cost}
            </span>

        </div>
    )
}

export default ItemList