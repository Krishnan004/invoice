
import React, { useState,useEffect } from 'react'
import InvoiveListItems from './InvoiveListItems';

const InvoiceItems = ({items,setItems,addItems,setAddItems}) => {
    const [showTextarea, setShowTextarea] = useState(false);
    const [itemName, setItemName] = useState()
    const [quantity, setQuantity] = useState(0)
    const [rate, setRate] = useState(0)
    const [total,setTotal]=useState()
    const [gst,setGst]=useState(0)
    const [description,setDescription]=useState()
    

        const handleButtonClick = () => {
          setShowTextarea(!showTextarea);
        };
       
        

        const handleAddItems=()=>{
            const id = items.length ? items[items.length - 1].id + 1 : 1;
            const total=quantity*rate;
            const listItems={id,item:itemName,quantity:quantity,rate:rate,total,description:description,gst:gst}
            const updatedItems=[...items,listItems]
            setItems(updatedItems);
            setItemName('')
            setRate('')
            setQuantity('')
            setTotal('')
            setDescription('')
        }
        
        const [sumTotal, setSumTotal] = useState(0);
        const [tax,setTax]=useState(0)

    useEffect(() => {
        const totalSum = items.reduce((acc, item) => acc + item.total, 0);
        setSumTotal(totalSum);
        const cgst=sumTotal?((sumTotal*gst/100)/2):0
        setTax(cgst);
    }, [items]);

    

    return (
        <main className="mx-10 border rounded-2xl border-gray-400 ">
            <header className="pl-2 bg-custom-blue grid grid-cols-8 list-none text-white rounded-t-2xl text-center text-xl py-6">
                <li>Item</li>
                <li>GST</li>
                <li>Quantity</li>
                <li>Rate</li>
                <li>Amount</li>
                <li>CGST</li>
                <li>SGST</li>
                <li>Total</li>
            </header>
            <InvoiveListItems items={items} setItems={setItems} />
            <main >
                <form onSubmit={handleAddItems} class=" grid grid-cols-8 gap-2 ">
                    <input type="text" id="invoice" name="itemname" class="invoice" placeholder="Item " value={itemName} onChange={(e) => setItemName(e.target.value)} />
                    <input type="text" id="invoice" name="GST" class="invoice" placeholder="%" value={gst} onChange={(e) => setGst(e.target.value)} />
                    <input type="text" id="invoice" name="quantity" class="invoice" placeholder="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <input type="text" id="invoice" value={rate} name="rate" placeholder="Rate" onChange={(e)=>setRate(e.target.value)}/>
                    <input type="text" id="invoice" name="amount" class="invoice" placeholder="₹00.00" value={quantity*rate}/>
                    <input type="text" id="invoice" name="CGST" value={((quantity*rate)*gst/100)/2} placeholder="CGST"/>
                    <input type="text" id="invoice" name="SGST" placeholder="SGST" value={((quantity*rate)*gst/100)/2}/>
                    <input type="text" id="invoice" name="total" class="invoice" placeholder="₹00.00" value={(quantity*rate)+(quantity*rate)*gst/100}/>
                </form>
                <div className="border-b border-gray-300">
                    <button
                        onClick={handleButtonClick}
                        className="px-4 py-2 border-gray-300 text-custom-blue rounded"
                    >
                        + Add Description
                </button>
                    {showTextarea && (
                        <textarea
                            className="mt-4 p-2 border border-gray-300 w-full"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    )}
                </div>
                <additems>
                    <button
                        className="px-4 py-2 border-gray-300 text-custom-blue rounded"
                        onClick={() => handleAddItems()}
                    >
                        + Add New Item
                </button>
                </additems>
                
                
            </main>
            
        </main>
    )
}

export default InvoiceItems
