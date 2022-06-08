import React, { useEffect, useState } from 'react'
import Checkout from './components/Checkout';
import ClickableCard from './components/ClickableCard';
import ItemList from './components/ItemList';
import TableHeader from './components/TableHeader';
import { productsData } from './data/dummyProduct';

const App = () => {


    const [itemList, setItemList] = useState([]);

    const initialCheckoutInfo = {
        subtotal: 0,
        noOfItem: 0,
        tax: 6,
        serviceCharge: null
    }

    const [checkoutInfo, setCheckoutInfo] = useState(initialCheckoutInfo)

    const handleClick = (id, name, price) => {

        const isAdded = itemList.some(element => {
            if (element.productName === name) {
                return true;
            }
            return false;
        });

        const quantity = 1;
        const cost = price * quantity;

        if (!isAdded) {
            setItemList([...itemList, {
                id: id,
                productName: name,
                price: price.toFixed(2),
                quantity: quantity,
                cost: cost
            }])
        }
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

    }

    useEffect(() => {

        const total = itemList.reduce((total, item) => total = total + item.cost, 0);

        setCheckoutInfo(prevState => ({ ...prevState, subtotal: total }))

    }, [itemList])

    return (
        <div className='flex w-screen h-fit 2xl:h-screen justify-evenly items-center sm:p-10'>

            <div className=' w-11/12 h-5/6 grid 2xl:grid-cols-6 2xl:grid-rows-1 grid-row-6 dark:bg-main-dark-bg gap-5'>

                <div className='bg-white 2xl:col-span-3 2xl:row-span-1 3xl:col-span-2 row-span-2 justify-between items-center rounded-2xl p-10 drop-shadow-2xl z-10'>

                    <h1 className='text-3xl font-bold text-center'>POS</h1>
                    <h1 className='text-3xl font-bold text-center'>Cashier</h1>

                    <TableHeader />

                    <div className=' min-h-[20rem] max-h-[20rem] mb-10 overflow-auto'>
                        {itemList.map((items) => (
                            <ItemList
                                items={items}
                                onIncr={() => handleIncr(items)}
                                onDecr={() => handleDecr(items)} />
                        ))}
                    </div>

                    <Checkout
                        subtotal={checkoutInfo.subtotal}
                        onCancel={() => handleCancel()}
                        onCheckout={() => handleCheckout()} />

                </div>


                <div className='rounded-2xl 2xl:col-span-3 2xl:row-span-1 3xl:col-span-4 row-start-1 bg-white drop-shadow-2xl p-10 space-y-8'>

                    <h1 className='text-3xl font-bold text-center'>Products</h1>

                    <div className='grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-6 p-10 2xl:h-[50rem] h-[45rem] overflow-y-auto'>
                        {productsData.map((product) => (
                            <ClickableCard
                                imgSrc={product.ProductImage}
                                name={product.ProductName}
                                price={product.Price.toFixed(2)}
                                onClick={() => handleClick(product.Id, product.ProductName, product.Price,)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App