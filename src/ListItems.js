import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { LiaRupeeSignSolid } from "react-icons/lia";

const ListItems = ({ items, setItems }) => {
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
          {items.map((item) => (
            <div key={item.id} className="text-gray-500 border-b border-gray-400 rounded-xl ">
              <div className="sm:px-12 grid grid-cols-2 sm:grid sm:grid-cols-5 gap-2 p-2">
              <label className="sm:hidden" >Item:</label><p className="item" name="itemname">{item.item}</p>
                <label className="sm:hidden" id="quantity">Quantity:</label><p className="item" name="quantity">{item.quantity}</p>
                <label className="sm:hidden" >Rate:</label><p className="item" name="rate"><LiaRupeeSignSolid className="inline"/>{(item.rate)}</p>
                <label className="sm:hidden">Amount:</label><p className="item" name="amount"><LiaRupeeSignSolid className="inline"/>{(item.quantity * item.rate).toFixed(2)}</p>
                <label className="sm:hidden">Total:</label>
                <div className="flex items-center ">
                <p className="item" name="total"><LiaRupeeSignSolid className="inline"/>{(item.total).toFixed(2)}</p>
                  <RxCross2 className="ml-2 text-2xl cursor-pointer float-right  " onClick={() => handleDelete(item.id)} />
                </div>
              </div>
              <IoIosArrowDown
                className={`ml-11 cursor-pointer transform transition-transform duration-300 ${
                  activeItemId[item.id] ? 'rotate-180' : ''
                }`}
                onClick={() => toggleDescription(item.id)}
              />
              {descriptionVisible[item.id] && (
                <>
                  <h2 className="sm:ml-11 inline">Description:</h2>
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
