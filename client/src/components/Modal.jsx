import React, { useEffect, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import axios from 'axios'

const Modal = ({ checkoutInfo, itemList, status, onOpen, onClose }) => {

    const [totalCost, setTotalCost] = useState(0)
    const [paidAmount, setPaidAmount] = useState(0)
    const [change, setChange] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState("Cash")

    const options = [
        { label: "Cash", value: "Cash" },
        { label: "Credit/Debit", value: "Credit/Debit" },
        { label: "FPX", value: "FPX" },
        { label: "Touch n Go", value: "Touch n Go" },
        { label: "Shopee Pay", value: "Shopee Pay" }
    ];

    useEffect(() => {

        const total = checkoutInfo.subtotal + (checkoutInfo.subtotal / 100 * checkoutInfo.tax) + (checkoutInfo.subtotal / 100 * checkoutInfo.serviceCharge)

        setTotalCost(total.toFixed(2))
    }, [onOpen])


    const blur = () => {
        const num = parseFloat(paidAmount);
        const filteredInput = num.toFixed(2);

        setPaidAmount(filteredInput);
    }

    const generateRefNum = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    const generateBigInt = (length) => {
        const characters = '0123456789';

        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return parseInt(result);
    }


    const createOrder = async () => {

        const refNum = generateRefNum(5)
        const arr = [true, false]
        const tax = checkoutInfo.tax;
        const serviceCharge = checkoutInfo.serviceCharge
        const isWalkIn = arr[Math.round(Math.random())]
        const bigInt = generateBigInt(10)

        const saveOrder = await axios.post("http://localhost:3001/api/orders", {
            reference_no: refNum,
            tax: tax,
            service_charge: serviceCharge,
            total_amount_rm: totalCost,
            is_walkin: isWalkIn,
            status: status,
        })


        const orderId = await axios.get("http://localhost:3001/api/orders/" + refNum)

        itemList.map(async (item) => {
            const saveItem = await axios.post("http://localhost:3001/api/orders/items", {
                order_id: generateBigInt(10),
                cost_per_item: item.price,
                product_name: item.productName,
                quantity: item.quantity,
                orders_id: orderId.data
            })
        })

        const transactionInfo = {
            order_id: generateBigInt(10),
            payment_method: paymentMethod,
            status: status,
            paid_amount_rm: paidAmount,
            orders_id: orderId.data
        }

        console.log(transactionInfo)

        const saveTransaction = await axios.post("http://localhost:3001/api/orders/transaction", transactionInfo)

    }

    const closeModal = () => {
        onClose(false);
        setPaidAmount(0);
        setChange(0);
    }

    const handleSubmit = () => {
        createOrder();
        closeModal();
    }

    useEffect(() => {
        const num = paidAmount - totalCost;
        if (num > 0) {
            setChange(num.toFixed(2));
        } else {
            setChange(0)
        }
    }, [blur])


    if (!onOpen) return null;

    return (
        <div className='fixed flex inset-0 z-50 items-center justify-center'>

            <div
                className='fixed w-full h-full bg-black opacity-70'
                onClick={() => closeModal()}>
                Overlay
            </div>

            <div className='fixed w-5/6 max-w-3xl bg-white p-5 space-y-3 rounded-2xl'>

                <div className='grid grid-cols-4 h-20 items-center just'>

                    <span className='text col-span-2 col-start-2 text-3xl font-bold justify-self-center'>
                        Check Out
                    </span>

                    <button
                        type='button'
                        className='justify-self-end self-start text-4xl text-gray-400 bg-white p-1 rounded-xl hover:drop-shadow-xl'
                        onClick={() => closeModal()}>
                        <MdOutlineClose />
                    </button>

                </div>

                <div className='p-5 space-y-10'>

                    <div className='flex justify-between items-start'>

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
                                        value={opt.value}
                                        icon={opt.icon}>
                                        {opt.label}
                                    </option>
                                ))}

                            </select>

                        </div>

                    </div>

                    <div className='flex justify-between border-t-4 pt-8'>

                        <span className='text-center text-3xl font-semibold'>
                            Total
                        </span>

                        <span className='text-center text-3xl font-semibold'>
                            {`RM ${totalCost}`}
                        </span>

                    </div>


                    <div className='flex justify-between'>

                        <span className='text-center text-3xl font-semibold'>
                            Change
                        </span>

                        <span className='text-center text-3xl font-semibold'>
                            {`RM ${change}`}
                        </span>

                    </div>

                    <div className='grid grid-cols-2 gap-10 pt-10'>

                        <button
                            type='button'
                            className='h-28 rounded-xl text-3xl font-semibold bg-red-400 self-stretch hover:drop-shadow-2xl hover:scale-110 active:brightness-75 transition-all'
                            onClick={() => closeModal()}>
                            Close
                        </button>

                        <button
                            type='button'
                            className='h-28 rounded-xl text-3xl font-semibold bg-green-400 self-stretch hover:drop-shadow-2xl hover:scale-110 active:brightness-75 transition-all'
                            onClick={() => handleSubmit()}>
                            Submit
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal