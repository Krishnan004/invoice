import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { LiaRupeeSignSolid } from "react-icons/lia";

const InvoiceSumTotal = ({ items,disCount,setDisCount,total,setTotal}) => {
    const [disVisibility, setDisVisibility] = useState(false);
    
    const [sumTotal, setSumTotal] = useState(0);
   
    const [tax, setTax] = useState(0);

    const handleDiscountVisibility = () => {
        setDisVisibility(!disVisibility);
    };
    const handleDiscountCancel=()=>{
        const value=sumTotal+tax+tax
        setTotal(value)
        setDisCount(0)
    }

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
        
        const gst = items.length > 0 ? items[0].gst : 0;
        const cgst = totalSum * gst / 100 / 2;
        setTax(cgst);
        const total=(sumTotal + tax + tax-disCount).toFixed(2);
        setTotal(total);
    }, [tax,items]);

    useEffect(() => {
        const gst = items.length > 0 ? items[0].gst : 0;
        const cgst = sumTotal * gst / 100 / 2;
        setTax(cgst);
    }, [total,sumTotal,items]);

    return (
        <div className="m-8  grid justify-items-end gap-2 text-gray-500 text-lg">
            <div className="m-2 mx-12 grid grid-cols-2 gap-2 justify-items-end   w-80">
                <label >
                    Amount: 
                </label>
                <label ><LiaRupeeSignSolid className="inline"/>{sumTotal.toFixed(2)}</label>
                <label >
                    CGST: 
                </label>
                <label ><LiaRupeeSignSolid className="inline"/>{tax.toFixed(2)}</label>
                <label >
                    SGST: 
                </label>
                <label ><LiaRupeeSignSolid className="inline"/>{tax.toFixed(2)}</label>
                </div>
                <div className="">
                {disCount > 0 && (
                    <div className="mx-8 grid grid-cols-2  justify-items-end">
                    <label className="mx-8">
                        Discount: 
                    </label>
                    <label className=""><LiaRupeeSignSolid className="inline  "/>{disCount.toFixed(2)}<RxCross2 className="inline" onClick={handleDiscountCancel} /></label>
                    </div>
                )}
                {!disVisibility ? (
                    <div className="mr-20">
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
                <label className="block" onClick={handleRoundOff}>Round Off</label>
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
