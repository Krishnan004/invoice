import React, { useState,useEffect } from 'react'

const SumTotal = ({items}) => {

    const [sumTotal, setSumTotal] = useState(0);

    useEffect(() => {
        const totalSum = items.reduce((acc, item) => acc + item.total, 0);
        setSumTotal(totalSum);
    }, [items]);

    return (
        <div className="mb-2">
            <label className=" text-xs sm:text-2xl text-gray-500 flex justify-end items-center">Total Amount  <span className="mx-8 text-gray-600 font-bold" ><span className="font-sans font-medium">₹ </span>{sumTotal.toFixed(2)}</span></label>
        </div>
    )
}

export default SumTotal
