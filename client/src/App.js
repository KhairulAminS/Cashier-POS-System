import React, { useEffect, useState, memo } from 'react'
import { Cashier, Products, Modal, WarningToast, TransactionSim, OrderCreated, Paid } from './components/index'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'


const App = () => {


    const [itemList, setItemList] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [productData, setProductData] = useState([]);
    const [status, setStatus] = useState("Pending")
    const [orderCreated, setOrderCreated] = useState(false)
    const [refNum, setRefNum] = useState("")

    const initialCheckoutInfo = {
        subtotal: 0,
        noOfItem: 0,
        tax: 6,
        serviceCharge: 0
    }

    const [checkoutInfo, setCheckoutInfo] = useState(initialCheckoutInfo)

    useEffect(() => {

        const total = itemList.reduce((total, item) => total = total + item.cost, 0);

        const totalItems = itemList.reduce((total, item) => total = total + item.quantity, 0);

        setCheckoutInfo(prevState => ({
            ...prevState,
            subtotal: total,
            noOfItem: totalItems,
        }))

    }, [itemList])

    useEffect(async () => {
        try {
            const res = await axios.get("/api/products")
            setProductData(res.data)
        } catch (err) {
            alert(err.message)
        }
    }, [])

    const warningToast = () => toast.custom((t) => <WarningToast t={t} />)

    const updateStatus = async () => {

        const orderId = await axios.get("/api/orders/" + refNum)

        const updateOrder = await axios.put("/api/orders/" + orderId.data, {
            status: "Paid"
        })
    }

    const transactionSim = () => {
        toast.custom((t) => <OrderCreated t={t} />, { duration: 2000 })

        setTimeout(() => {
            toast.custom((t) => <TransactionSim t={t} />)
        }, 2000)

        setOrderCreated(false)

        setTimeout(() => {
            updateStatus()
            toast.custom((t) => <Paid t={t} />, { duration: 2000 })
        }, 6000)
    }

    if (orderCreated) {
        memo(transactionSim())
    }

    console.log("App is rendering")

    return (
        <div className='flex w-screen h-screen justify-evenly items-center sm:p-10'>

            <div className='h-full grid xl:grid-cols-6 xl:grid-rows-1 grid-row-2 grid-cols-1 gap-5'>

                <Cashier
                    itemList={itemList}
                    checkoutInfo={checkoutInfo}
                    setItemList={setItemList}
                    setCheckoutInfo={setCheckoutInfo}
                    setIsOpen={setIsOpen}
                    toast={warningToast}
                />

                <Products
                    productData={productData}
                    itemList={itemList}
                    setItemList={setItemList}
                />
            </div>

            <Modal
                checkoutInfo={checkoutInfo}
                itemList={itemList}
                status={status}
                onOpen={isOpen}
                setIsOpen={setIsOpen}
                setRefNum={setRefNum}
                setOrderCreated={setOrderCreated}
                setItemList={setItemList}
                setCheckoutInfo={setCheckoutInfo} />

            <Toaster />
        </div>
    )
}

export default App