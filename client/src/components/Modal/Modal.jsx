import React, { useEffect, useState } from 'react'
import Title from './Title';
import { PaymentAmount, PaymentMethod, TotalChange, ActionButton } from '../index'


const Modal = ({ checkoutInfo, itemList, status, onOpen, setIsOpen, setRefNum, setItemList, setOrderCreated, setCheckoutInfo }) => {

    const [totalCost, setTotalCost] = useState(0)
    const [paidAmount, setPaidAmount] = useState(0)
    const [change, setChange] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState("Cash")


    useEffect(() => {

        const total = checkoutInfo.subtotal + (checkoutInfo.subtotal / 100 * checkoutInfo.tax) + (checkoutInfo.subtotal / 100 * checkoutInfo.serviceCharge)

        setTotalCost(total.toFixed(2))
    }, [onOpen])



    const closeModal = () => {
        setPaidAmount(0);
        setChange(0);
        setIsOpen(false);
    }


    if (!onOpen) return null;

    return (
        <div className='fixed flex inset-0 z-50 items-center justify-center'>

            <div
                className='fixed w-full h-full bg-black opacity-70'
                onClick={() => closeModal()}>
                Overlay
            </div>

            <div className='fixed w-5/6 max-w-3xl bg-white p-5 space-y-3 rounded-2xl'>

                <Title
                    closeModal={() => closeModal()} />

                <div className='p-5 space-y-10'>

                    <div className='flex justify-between items-start'>

                        <PaymentAmount
                            paidAmount={paidAmount}
                            totalCost={totalCost}
                            setPaidAmount={setPaidAmount}
                            setChange={setChange} />

                        <PaymentMethod
                            setPaymentMethod={setPaymentMethod} />

                    </div>

                    <TotalChange
                        totalCost={totalCost}
                        change={change} />

                    <ActionButton
                        checkoutInfo={checkoutInfo}
                        itemList={itemList}
                        totalCost={totalCost}
                        status={status}
                        paymentMethod={paymentMethod}
                        paidAmount={paidAmount}
                        closeModal={closeModal}
                        setRefNum={setRefNum}
                        setOrderCreated={setOrderCreated}
                        setItemList={setItemList}
                        setCheckoutInfo={setCheckoutInfo}/>
                </div>
            </div>
        </div>
    )
}

export default Modal