import React, { useState, useEffect } from 'react';
import { LiaRupeeSignSolid } from "react-icons/lia";

const PrintTotal = ({ items,disCount,total}) => {
    const [sumTotal, setSumTotal] = useState(0);
    const [tax, setTax] = useState(0);
    useEffect(() => {
        const totalSum = items.reduce((acc, item) => acc + item.total, 0);
        setSumTotal(totalSum);
        const gst = items.length > 0 ? items[0].gst : 0;
        const cgst = totalSum * gst / 100 / 2;
        setTax(cgst);
    }, [tax,items]);

    useEffect(() => {
        const gst = items.length > 0 ? items[0].gst : 0;
        const cgst = sumTotal * gst / 100 / 2;
        setTax(cgst);
    }, [total,sumTotal,items]);

    return (
        <div className="m-2  grid justify-items-end gap-2">
            <div className="m-2 grid grid-cols-2 gap-2 text-gray-500 text-lg  w-80">
                <label >
                    Amount: 
                </label>
                <label ><span className="font-sans font-medium">₹ </span>{sumTotal.toFixed(2)}</label>
                <label >
                    CGST: 
                </label>
                <label ><span className="font-sans font-medium">₹ </span>{tax.toFixed(2)}</label>
                <label >
                    SGST: 
                </label>
                <label ><span className="font-sans font-medium">₹ </span>{tax.toFixed(2)}</label>
                {disCount > 0 && (
                    <label className="text-red-500">
                        Discount%: 
                    </label>
                )}
                {disCount > 0 && (
                    <label className="text-red-500"><LiaRupeeSignSolid className="inline "/>{disCount.toFixed(2)}</label>
                )}
                </div>
                <div className="border-y border-gray-500 inline p-4">
                <label className="text-2xl text-gray-500">
                    Total Amount <span className="mx-8 text-gray-600 font-bold"><span className="font-sans font-medium">₹ </span>{total}</span>
                </label>
            </div>
                
        </div>
    );
};

export default PrintTotal
