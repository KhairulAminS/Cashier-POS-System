import React from 'react'
import { TableHeader, ItemList, Checkout } from './index'

const Cashier = ({ itemList, checkoutInfo, setItemList, setCheckoutInfo, setIsOpen, toast }) => {

    const initialCheckoutInfo = {
        subtotal: 0,
        noOfItem: 0,
        tax: 6,
        serviceCharge: 0
    }

    const handleIncr = (item) => {

        const newQuantity = item.quantity + 1;
        const newCost = item.price * newQuantity;

        setItemList(
            itemList.map(items =>
                items.id === item.id
                    ? { ...items, quantity: newQuantity, cost: newCost }
                    : items
            ))

    }

    const handleDecr = (item) => {

        const newQuantity = item.quantity - 1;
        const newCost = item.price * newQuantity;

        if (newQuantity === 0) {
            setItemList(itemList.filter(items => items.id !== item.id))
        } else {
            setItemList(
                itemList.map(items =>
                    items.id === item.id
                        ? { ...items, quantity: newQuantity, cost: newCost }
                        : items
                ))
        }
    }

    const handleCancel = () => {
        setItemList([]);
        setCheckoutInfo(initialCheckoutInfo);
    }

    const handleCheckout = () => {
        if (itemList.length !== 0) {
            return setIsOpen(true);
        }

        toast()
    }

    return (
        <div className=' xl:col-span-3 xl:row-span-1 3xl:col-span-2 rounded-2xl p-10 drop-shadow-2xl z-10 grid grid-rows-checkout bg-white h-full'>

            <div className='flex flex-col h-full justify-between'>
                <div>
                    <h1 className='text-3xl font-bold text-center'>
                        POS
                    </h1>
                    <h1 className='text-3xl font-bold text-center'>
                        Cashier
                    </h1>
                </div>
                <TableHeader />
            </div>

            <div className='row-span-3 overflow-auto border-t-4 border-gray-400'>
                {itemList.map((items) => (
                    <ItemList
                        items={items}
                        onIncr={() => handleIncr(items)}
                        onDecr={() => handleDecr(items)} />
                ))}
            </div>

            <div className='row-span-3'>
                <Checkout
                    checkoutInfo={checkoutInfo}
                    onCancel={() => handleCancel()}
                    onCheckout={() => handleCheckout()} />
            </div>
        </div>
    )
}

export default Cashier