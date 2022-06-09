import React from 'react'

const Checkout = ({ checkoutInfo, onCancel, onCheckout }) => {
    return (
        <div className='border-t-4 px-10 pt-5 space-y-3 self-end'>
            <div className='flex justify-between'>
                <span className='text-center text-xl font-semibold'>Subtotal</span>
                <span className='text-center text-xl font-semibold'>{checkoutInfo.subtotal.toFixed(2)}</span>
            </div>

            <div className='flex justify-between'>
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

            <div className='grid grid-cols-2 gap-10 pt-10'>
                <button type='button' className='h-28 rounded-xl text-3xl font-semibold bg-red-400 self-stretch hover:drop-shadow-2xl hover:scale-110 active:brightness-75 transition-all'
                    onClick={onCancel}>
                    Cancel
                </button>
                <button type='button' className='h-28 rounded-xl text-3xl font-semibold bg-green-400 self-stretch hover:drop-shadow-2xl hover:scale-110 active:brightness-75 transition-all'
                    onClick={onCheckout}>
                    Check out
                </button>
            </div>
        </div>
    )
}

export default Checkout