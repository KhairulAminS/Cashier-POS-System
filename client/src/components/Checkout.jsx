import React from 'react'

const Checkout = ({ checkoutInfo, onCancel, onCheckout }) => {
    return (
        <div className='border-t-4 border-gray-400 px-10 grid grid-rows-6 h-full items-center'>

            <div className='flex justify-between '>
                <span className='text-center text-xl font-semibold'>Subtotal</span>
                <span className='text-center text-xl font-semibold'>{checkoutInfo.subtotal.toFixed(2)}</span>
            </div>

            <div className='flex justify-between '>
                <span className='text-center text-xl font-semibold'>No. of items</span>
                <span className='text-center text-xl font-semibold'>{checkoutInfo.noOfItem}</span>
            </div>

            <div className='flex justify-between'>
                <span className='text-center text-xl font-semibold'>Tax</span>
                <span className='text-center text-xl font-semibold'>{`${checkoutInfo.tax}%`}</span>
            </div>

            <div className='flex justify-between'>
                <span className='text-center text-xl font-semibold'>Service charge</span>
                <span className='text-center text-xl font-semibold'>{checkoutInfo.serviceCharge !== 0 ? (`${checkoutInfo.serviceCharge}%`) : ('-')}</span>
            </div>

            <div className='grid grid-cols-2 gap-10 row-span-2 h-full pt-5'>
                <button type='button' className=' rounded-xl text-3xl font-semibold bg-red-400 self-stretch hover:drop-shadow-2xl hover:scale-110 active:brightness-75 transition-all'
                    onClick={onCancel}>
                    Cancel
                </button>
                <button type='button' className='rounded-xl text-3xl font-semibold bg-green-400 self-stretch hover:drop-shadow-2xl hover:scale-110 active:brightness-75 transition-all'
                    onClick={onCheckout}>
                    Check out
                </button>
            </div>
        </div>
    )
}

export default Checkout