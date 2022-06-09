import React, { useEffect, useState } from 'react'
import Checkout from './components/Checkout';
import ClickableCard from './components/ClickableCard';
import ItemList from './components/ItemList';
import TableHeader from './components/TableHeader';
import Modal from './components/Modal';
import { productsData } from './data/dummyProduct';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";


const App = () => {


    const [itemList, setItemList] = useState([]);
    const [isOpen, setIsOpen] = useState(false)

    const initialCheckoutInfo = {
        subtotal: 0,
        noOfItem: 0,
        tax: 6,
        serviceCharge: 0
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
        if (itemList.length !== 0) {
            return setIsOpen(true);
        }

        // nnt letak toast untuk kalo cart empty
        toast.warn('Your cart is empty!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    }

    useEffect(() => {

        const total = itemList.reduce((total, item) => total = total + item.cost, 0);

        const totalItems = itemList.reduce((total, item) => total = total + item.quantity, 0);

        setCheckoutInfo(prevState => ({
            ...prevState,
            subtotal: total,
            noOfItem: totalItems,
        }))

    }, [itemList])

    return (
        <div className='flex w-screen h-screen justify-evenly items-center sm:p-10'>

            <div className='h-full grid xl:grid-cols-6 xl:grid-rows-1 grid-row-2 grid-cols-1 gap-5'>

                <div className=' xl:col-span-3 xl:row-span-1 3xl:col-span-2 rounded-2xl p-10 drop-shadow-2xl z-10 grid grid-rows-5 bg-blue-400 h-full'>

                    <div className='flex flex-col row-span-1 h-full justify-between'>
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

                    <div className=' row-span-2 overflow-auto border-t-4 border-gray-400'>
                        {itemList.map((items) => (
                            <ItemList
                                items={items}
                                onIncr={() => handleIncr(items)}
                                onDecr={() => handleDecr(items)} />
                        ))}
                    </div>

                    <div className='row-span-2'>
                        <Checkout
                            checkoutInfo={checkoutInfo}
                            onCancel={() => handleCancel()}
                            onCheckout={() => handleCheckout()} />
                    </div>
                </div>


                <div className='rounded-2xl xl:col-span-3 xl:row-span-1 3xl:col-span-4 row-start-1 bg-white drop-shadow-2xl p-10 grid  grid-rows-products h-full'>

                    <h1 className='text-3xl font-bold text-center bg-blue-500'>Products</h1>

                    <div className='flex flex-wrap row-span-2 p-10 h-full overflow-y-auto md:justify-between justify-center gap-5'>
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

            <Modal
                checkoutInfo={checkoutInfo}
                onOpen={isOpen}
                onClose={() => setIsOpen(false)} />

            <ToastContainer
                toastClassName={() =>
                    "relative flex py-5 px-10 min-h-10 w-96 text-2xl bg-orange-500 rounded-xl font-black text-center justify-self-between"
                } />
        </div>
    )
}

export default App