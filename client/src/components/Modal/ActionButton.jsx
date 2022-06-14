import React from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

const ActionButton = ({ checkoutInfo, totalCost, itemList, status, paymentMethod, paidAmount, closeModal, setRefNum, setOrderCreated, setItemList, setCheckoutInfo }) => {

    const initialCheckoutInfo = {
        subtotal: 0,
        noOfItem: 0,
        tax: 6,
        serviceCharge: 0
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

        setRefNum(refNum)

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

        const saveTransaction = await axios.post("http://localhost:3001/api/orders/transaction", transactionInfo)
    }

    const handleSubmit = () => {
        createOrder();
        setOrderCreated(true)
        closeModal();
    }

    return (
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
    )
}

export default ActionButton