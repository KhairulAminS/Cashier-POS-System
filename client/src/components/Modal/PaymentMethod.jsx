import React from 'react'

const PaymentMethod = ({setPaymentMethod}) => {

    const options = [
        { label: "Cash", value: "Cash" },
        { label: "Credit/Debit", value: "Credit/Debit" },
        { label: "FPX", value: "FPX" },
        { label: "Touch n Go", value: "Touch n Go" },
        { label: "Shopee Pay", value: "Shopee Pay" }
    ];


    return (
        <div className='flex flex-col space-y-3 w-fit'>

            <span className='text-right text-gray-400 text-2xl font-semibold'>
                Payment Method
            </span>

            <select className='text-2xl font-semibold appearance-none p-2'
                id="payment_method"
                defaultValue={options[0]}
                onChange={(e) => setPaymentMethod(e.target.value)}>

                {options.map((opt) => (
                    <option className='text-right text-2xl font-semibold'
                        value={opt.value}>
                        {opt.label}
                    </option>
                ))}

            </select>

        </div>
    )
}

export default PaymentMethod