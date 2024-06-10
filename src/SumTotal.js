import React, { useState,useEffect } from 'react'
import { LiaRupeeSignSolid } from "react-icons/lia";

const SumTotal = ({items}) => {

    const [sumTotal, setSumTotal] = useState(0);

    useEffect(() => {
        const totalSum = items.reduce((acc, item) => acc + item.total, 0);
        setSumTotal(totalSum);
    }, [items]);

    return (
        <div className="mb-2">
            <label className=" text-2xl text-gray-500 flex justify-end">Total Amount  <span className="mx-8 text-gray-600 font-bold" ><LiaRupeeSignSolid className="inline"/>{sumTotal.toFixed(3)}</span></label>
        </div>
    )
}

export default SumTotal
