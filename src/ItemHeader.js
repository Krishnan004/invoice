import React from 'react'

const ItemHeader = () => {
    return (
        <header className="pl-10 bg-custom-blue grid grid-cols-5 list-none text-white rounded-t-2xl text-2xl p-6">
                <li>Item</li>
                <li>Quantity</li>
                <li>Rate</li>
                <li>Amount</li>
                <li>Total</li>
            </header>
    )
}

export default ItemHeader
