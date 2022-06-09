import React from 'react'

const TableHeader = () => {
    return (
        <div className='grid grid-cols-4 gap-5 py-3'>
            <span className='col-span-1 text-center text-lg font-semibold'>Product</span>
            <span className='col-span-1 text-center text-lg font-semibold'>{`Price (RM)`}</span>
            <span className='col-span-1 text-center text-lg font-semibold'>Quantity</span>
            <span className='col-span-1 text-center text-lg font-semibold'>{`Cost (RM)`}</span>
        </div>
    )
}

export default TableHeader