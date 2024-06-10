import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { LiaRupeeSignSolid } from "react-icons/lia";

const InvoiceSumTotal = ({ items }) => {
    const [disVisibility, setDisVisibility] = useState(false);
    const [disCount, setDisCount] = useState(0);
    const [sumTotal, setSumTotal] = useState(0);
    const [total,setTotal]=useState(0);
    const [tax, setTax] = useState(0);

    const handleDiscountVisibility = () => {
        setDisVisibility(!disVisibility);
    };

    const applyDiscount = (percentage) => {
        const value = sumTotal * percentage / 100;
        setDisCount(value);
        setTotal(total - value);
    };

    const handleRoundOff = () => {
        const roundOffSumTotal = Math.trunc(total);
        setTotal(roundOffSumTotal);
    };

    useEffect(() => {
        const totalSum = items.reduce((acc, item) => acc + item.total, 0);
        setSumTotal(totalSum);
        const total=(sumTotal + tax + tax).toFixed(2);
        setTotal(total);
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
        <div className="m-8  text-right">
            <div className="m-2 mx-10 grid grid-cols-1 gap-2 text-gray-500 text-lg ">
                <label >
                    Amount: <span ><LiaRupeeSignSolid className="inline"/>{sumTotal.toFixed(2)}</span>
                </label>
                <label >
                    CGST: <span ><LiaRupeeSignSolid className="inline"/>{tax.toFixed(2)}</span>
                </label>
                <label >
                    SGST: <span ><LiaRupeeSignSolid className="inline"/>{tax.toFixed(2)}</span>
                </label>
                {disCount > 0 && (
                    <label >
                        Discount: <span ><LiaRupeeSignSolid className="inline"/>{disCount.toFixed(2)}</span>
                    </label>
                )}
                {!disVisibility ? (
                    <div>
                    <button className="" onClick={handleDiscountVisibility}>+ Give discount on total</button>
                    </div>
                ) : (
                    <div>
                        <label htmlFor="reduction">Reduction: </label>
                        <input
                            type="text"
                            className="w-24 inline"
                            name="reduction%"
                            id="reduction"
                            placeholder="%"
                            onBlur={(e) => applyDiscount(e.target.value)}
                        />
                        <RxCross2 className="inline" onClick={handleDiscountVisibility} />
                    </div>
                )}
                <label className="block mx-28" onClick={handleRoundOff}>Round Off</label>
            </div>
            <div className="border-y border-gray-500 inline p-4">
                <label className="text-2xl text-gray-500">
                    Total Amount <span className="mx-8 text-gray-600 font-bold"><LiaRupeeSignSolid className="inline"/>{total}</span>
                </label>
            </div>
        </div>
    );
};

export default InvoiceSumTotal;
