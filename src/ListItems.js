import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { LiaRupeeSignSolid } from "react-icons/lia";

const ListItems = ({ items, setItems }) => {
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
          {items.map((item) => (
            <div key={item.id} className="text-gray-500 border border-gray-400">
              <div className="px-12 grid grid-cols-5 gap-2 p-2">
                <label className="item" name="itemname">{item.item}</label>
                <label className="item" name="quantity">{item.quantity}</label>
                <label className="item" name="rate"><LiaRupeeSignSolid className="inline"/>{item.rate}</label>
                <label className="item" name="amount"><LiaRupeeSignSolid className="inline"/>{item.quantity * item.rate}</label>
                <div className="flex items-center">
                  <label className="item" name="total"><LiaRupeeSignSolid className="inline"/>{item.total}</label>
                  <RxCross2 className="ml-2 text-2xl cursor-pointer float-right" onClick={() => handleDelete(item.id)} />
                </div>
              </div>
              <IoIosArrowDown className="ml-11 cursor-pointer" onClick={() => toggleDescription(item.id)} />
              {descriptionVisible[item.id] && (
                <>
                  <h2 className="ml-11 inline">Description:</h2>
                  <label name="description" className="m-4 text-gray-500 text-xs">{item.description}</label>
                </>
              )}
              <hr />
            </div>
          ))}
        
    </div>
  );
};

export default ListItems;
