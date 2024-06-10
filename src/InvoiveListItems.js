import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { LiaRupeeSignSolid } from "react-icons/lia";

const InvoiveListItems = ({items,setItems}) => {

  const [descriptionVisible, setDescriptionVisible] = useState({});

  const handleDelete = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  

  const toggleDescription = (id) => {
    setDescriptionVisible(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

    return (
        <div>
      {items.map((item, index) => (
        <div className="text-gray-500 bottom-b border-gray-300 " >
        <div key={index} className="pl-12 text-center grid grid-cols-8 gap-2 p-2 ">
          <label className="invoice" name="itemname" >{item.item}</label>
          <label className="invoice" name="gst">{item.gst}</label>
          <label className="invoice" name="quantity">{item.quantity}</label>
          <label className="invoice" name="rate"><LiaRupeeSignSolid className="inline"/>{item.rate}</label>
          <label className="invoice" name="amount"><LiaRupeeSignSolid className="inline"/>{(item.quantity * item.rate).toFixed(3)}</label>
          <label className="invoice" name="cgst" >{((item.quantity * item.rate)*item.gst/100/2).toFixed(3)}</label>
          <label className="invoice" name="sgst" >{((item.quantity * item.rate)*item.gst/100/2).toFixed(3)}</label>
          <div className="">
                  <label className="item" name="total"><LiaRupeeSignSolid className="inline"/>{((item.quantity * item.rate)+(item.quantity * item.rate)*item.gst/100).toFixed(3)}</label>
                  <RxCross2 className="ml-2 text-xl cursor-pointer float-right" onClick={() => handleDelete(item.id)} />
                </div>
        </div >
        <IoIosArrowDown className="ml-11 cursor-pointer" onClick={() => toggleDescription(item.id)} />
        {descriptionVisible[item.id] && (
          <>
            <h2 className="ml-11 inline">Description:</h2>
            <label name="description" className="m-4 text-gray-500 text-xs">{item.description}</label>
          </>
        )}
        <hr/>
        </div>
      ))}
      
    </div>
    )
}

export default InvoiveListItems
