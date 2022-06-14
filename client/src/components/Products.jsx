import React from 'react'
import ClickableCard from './ClickableCard'

const Products = ({ productData, itemList, setItemList }) => {

    const handleClick = (id, name, price) => {

        const isAdded = itemList.some(element => {
            if (element.productName === name) {
                return true;
            }
            return false;
        });

        const quantity = 1;
        const cost = parseFloat(price) * quantity;

        if (!isAdded) {
            setItemList([...itemList, {
                id: id,
                productName: name,
                price: parseFloat(price).toFixed(2),
                quantity: quantity,
                cost: cost
            }])
        }
    }

    return (
        <div className='rounded-2xl xl:col-span-3 xl:row-span-1 3xl:col-span-4 row-start-1 bg-white drop-shadow-2xl p-10 grid  grid-rows-products h-full'>

            <h1 className='text-3xl font-bold text-center '>
                Products
            </h1>

            <div className='w-full h-full overflow-y-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 row-span-2 p-10 h-fit max-h-4/6 md:justify-between justify-center gap-5'>
                    {productData.map((product) => (
                        <ClickableCard
                            imgSrc={product.image}
                            name={product.name}
                            price={product.price}
                            onClick={() => handleClick(product.id, product.name, product.price)} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Products