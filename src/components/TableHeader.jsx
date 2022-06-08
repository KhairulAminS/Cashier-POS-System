import React from 'react'

const TableHeader = () => {
    return (
        <div className='grid grid-cols-4 p-5 mt-8 gap-5'>
            <span className='col-span-1 text-center text-lg font-semibold'>Product</span>
            <span className='col-span-1 text-center text-lg font-semibold'>{`Price (RM)`}</span>
            <span className='col-span-1 text-center text-lg font-semibold'>Quantity</span>
            <span className='col-span-1 text-center text-lg font-semibold'>{`Cost (RM)`}</span>
        </div>
    )
}

export default TableHeader