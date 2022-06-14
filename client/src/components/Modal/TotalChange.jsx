import React from 'react'

const TotalChange = ({totalCost, change}) => {
    return (
        <div>
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
        </div>
    )
}

export default TotalChange