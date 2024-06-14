import React, { useState, useEffect } from 'react'
import SumTotal from './SumTotal';

const ItemContent = ({items,setItems}) => {
    
    const [showTextarea, setShowTextarea] = useState(false);
    const [itemName, setItemName] = useState()
    const [quantity, setQuantity] = useState(0)
    const [rate, setRate] = useState(0)
    const [total,setTotal]=useState()
    const [description,setDescription]=useState()

        const handleButtonClick = () => {
          setShowTextarea(!showTextarea);
        };
         
        

        const handleAddItems=()=>{
            const id = items.length ? items[items.length - 1].id + 1 : 1;
            const total=quantity*rate;
            const listItems={id,item:itemName,quantity:quantity,rate:rate,total,description:description}
            const updatedItems=[...items,listItems]
            setItems(updatedItems);
            setItemName('')
            setRate('')
            setQuantity('')
            setTotal('')
            setDescription('')
        }
        
        
       
    return (

        <main >
            <div onSubmit={handleAddItems} className=" grid grid-cols-5 gap-2">
                <input type="text" id="item" name="itemname"  placeholder="Item name" value={itemName} onChange={(e)=>setItemName(e.target.value)}/>
                <input type="text" id="item" name="quantity"  placeholder="Quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                <input type="text" id="item" name="rate"  placeholder="₹00.00" value={rate} onChange={(e)=>setRate(e.target.value)}/>
                 <input type="text" id="item" name="amount" placeholder="₹00.00"
                    readOnly
                    value={quantity * rate}/>
                    <input type="text" id="item" name="amount" placeholder="₹00.00"
                    readOnly
                    value={quantity * rate}/>
                
            </div>
            <div className="border-b border-gray-300">
            <button 
                    onClick={handleButtonClick} 
                    className="px-4 py-2 border-gray-300 text-gray-600 rounded"
                >
                    + Add Description
                </button>
                {showTextarea && (
                    <textarea 
                    className="mt-4 p-2 border border-gray-300 w-full"
                    placeholder="Description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    ></textarea>
                )}
                </div>
                <div>
                <button 
                    className="px-4 py-2 border-gray-300 text-gray-600 rounded"
                    onClick={()=>handleAddItems()}
                >
                    + Add New Item
                </button>
                </div> 
                <SumTotal items={items} />
        </main>
    )
}

export default ItemContent
