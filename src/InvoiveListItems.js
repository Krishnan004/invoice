import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { LiaRupeeSignSolid } from "react-icons/lia";

const InvoiveListItems = ({items,setItems}) => {

  const [descriptionVisible, setDescriptionVisible] = useState({});

  const [activeItemId, setActiveItemId] = useState({});
  
  const toggleDescription = (id) => {
    setActiveItemId(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    setDescriptionVisible(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  const handleDelete = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

    return (
        <div>
      {items.map((item, index) => (
        <div className="text-gray-500 bottom-b border-gray-300 " >
        <div key={index} className="sm:pl-12 sm:text-center sm:grid sm:grid-cols-8 grid grid-cols-2 gap-2 p-2  sm:text-sm 2xl:text-xl">
        <label className="sm:hidden" >Item:</label><label className="invoice" name="itemname" >{item.item}</label>
        <label className="sm:hidden" >GST:</label><label className="invoice" name="gst">{item.gst}</label>
        <label className="sm:hidden" >Quantity:</label><label className="invoice" name="quantity">{item.quantity}</label>
        <label className="sm:hidden" >Rate:</label><label className="invoice" name="rate"><LiaRupeeSignSolid className="inline"/>{(item.rate)}</label>
        <label className="sm:hidden" >Amount:</label><label className="invoice" name="amount"><LiaRupeeSignSolid className="inline"/>{(item.quantity * item.rate).toFixed(3)}</label>
        <label className="sm:hidden" >CGST:</label> <label className="invoice" name="cgst" ><LiaRupeeSignSolid className="inline"/>{((item.quantity * item.rate)*item.gst/100/2).toFixed(3)}</label>
        <label className="sm:hidden" >SGST:</label><label className="invoice" name="sgst" ><LiaRupeeSignSolid className="inline"/>{((item.quantity * item.rate)*item.gst/100/2).toFixed(3)}</label>
        <label className="sm:hidden" >Total:</label> 
          <div className="">
          <label className="item" name="total"><LiaRupeeSignSolid className="inline"/>{((item.quantity * item.rate)+(item.quantity * item.rate)*item.gst/100).toFixed(3)}</label>
                  <RxCross2 className="ml-2 text-xl cursor-pointer float-right" onClick={() => handleDelete(item.id)} />
                </div>
        </div >
        <IoIosArrowDown
                className={`ml-11 cursor-pointer transform transition-transform duration-300 ${
                  activeItemId[item.id] ? 'rotate-180' : ''
                }`}
                onClick={() => toggleDescription(item.id)}
              />
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
