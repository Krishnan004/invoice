import React from 'react'

const ItemHeader = () => {
    return (
        <header className="p-4 sm:pl-10 bg-custom-blue grid grid-cols-1 sm:grid-cols-5 gap-6 list-none text-white rounded-t-2xl sm:text-2xl text-xs sm:p-6">
            <li className="block">Item</li>
            <li className="hidden sm:block">Quantity</li>
            <li className="hidden sm:block">Rate</li>
            <li className="hidden sm:block">Amount</li>
            <li className="hidden sm:block">Total</li>
        </header>

    )
}

export default ItemHeader
