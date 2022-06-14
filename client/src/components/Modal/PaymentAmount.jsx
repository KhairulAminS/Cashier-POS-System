import React, { useEffect } from 'react'

const PaymentAmount = ({ paidAmount, totalCost, setPaidAmount, setChange }) => {

    const blur = () => {
        const num = parseFloat(paidAmount);
        const filteredInput = num.toFixed(2);

        setPaidAmount(filteredInput);
    }

    useEffect(() => {
        const num = paidAmount - totalCost;
        if (num > 0) {
            setChange(num.toFixed(2));
        } else {
            setChange(0)
        }
    }, [blur])

    return (
        <div className='flex flex-col w-3/5 space-y-3'>

            <span className='text-gray-400 text-2xl font-semibold'>
                Paid Amount
            </span>

            <div className='flex space-x-5 items-end'>

                <span className='text-3xl font-semibold'>
                    RM
                </span>

                <input
                    type='number'
                    className='border-b-4 outline-none w-full text-3xl font-semibold text-right'
                    placeholder='Enter the paid amount'
                    defaultValue={null}
                    onChange={(e) => {
                        setPaidAmount(e.target.value)
                    }}
                    onBlur={() => blur()} />

            </div>

        </div>

    )
}

export default PaymentAmount