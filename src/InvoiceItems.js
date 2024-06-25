import React, { useState, useEffect } from 'react';
import InvoiveListItems from './InvoiveListItems';

const InvoiceItems = ({ items, setItems, addItems, setAddItems }) => {
    const [showTextarea, setShowTextarea] = useState(false);
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [rate, setRate] = useState(0);
    const [gst, setGst] = useState(0);
    const [description, setDescription] = useState('');

    const handleButtonClick = () => {
        setShowTextarea(!showTextarea);
    };

    const handleAddItems = (e) => {
        e.preventDefault();
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const total = quantity * rate;
        const listItems = {
            id,
            item: itemName,
            quantity,
            rate,
            total,
            description,
            gst
        };
        const updatedItems = [...items, listItems];
        setItems(updatedItems);
        setItemName('');
        setRate(0);
        setQuantity(0);
        setGst(0);
        setDescription('');
    };

    const [sumTotal, setSumTotal] = useState(0);
    const [tax, setTax] = useState(0);

    useEffect(() => {
        const totalSum = items.reduce((acc, item) => acc + item.total, 0);
        setSumTotal(totalSum);
        const cgst = totalSum ? ((totalSum * gst) / 100) / 2 : 0;
        setTax(cgst);
    }, [items, gst]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        setItems(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems[index] = { ...updatedItems[index], [name]: value};
            if (name === 'quantity' || name === 'rate') {
                updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].rate;
            }
            return updatedItems;
        });
    };

    return (
        <main className="p-2 mx-8 border rounded-2xl border-gray-400">
            <div className="my-2 sm:mx-8 border rounded-2xl border-gray-400">
                <header className="pl-2 bg-custom-blue grid grid-cols-8 list-none text-white rounded-t-2xl text-center text-xl py-6">
                    <li>Item</li>
                    <li className="hidden sm:block">GST</li>
                    <li className="hidden sm:block">Quantity</li>
                    <li className="hidden sm:block">Rate</li>
                    <li className="hidden sm:block">Amount</li>
                    <li className="hidden sm:block">CGST</li>
                    <li className="hidden sm:block">SGST</li>
                    <li className="hidden sm:block">Total</li>
                </header>
                {items.length === 0 && <p className="text-center">Empty</p>}
                <InvoiveListItems items={items} setItems={setItems} />
            </div>
            <div className="sm:mx-8 border rounded-2xl border-gray-400">
                <form onSubmit={handleAddItems}>
                {items.map((item, index) => (
                    <div className="sm:grid grid-cols-8 gap-2">
                        <input
                            type="text"
                            id="invoice"
                            name="item"
                            className="invoice"
                            placeholder="Item"
                            
                            onChange={e => handleChange(index, e)}
                        />
                        <input
                            type="number"
                            id="invoice"
                            name="gst"
                            className="invoice"
                            placeholder="%"
                            onChange={e => handleChange(index, e)}
                        />
                        <input
                            type="tel"
                            id="invoice"
                            name="quantity"
                            className="invoice"
                            placeholder="Quantity"
                            onChange={e => handleChange(index, e)}
                        />
                        <input
                            type="number"
                            id="invoice"
                            name="rate"
                            className="invoice"
                            placeholder="Rate"
                            onChange={e => handleChange(index, e)}
                        />
                        <input
                            type="text"
                            id="invoice"
                            name="amount"
                            className="invoice"
                            placeholder="₹00.00"
                            value={item.quantity * item.rate}
                            readOnly
                        />
                        <input
                            type="text"
                            id="invoice"
                            name="CGST"
                            className="invoice"
                            value={((item.quantity * item.rate) * item.gst / 100) / 2}
                            placeholder="CGST"
                            readOnly
                        />
                        <input
                            type="text"
                            id="invoice"
                            name="SGST"
                            className="invoice"
                            placeholder="SGST"
                            value={((item.quantity * item.rate) * item.gst / 100) / 2}
                            readOnly
                        />
                        <input
                            type="text"
                            id="invoice"
                            name="total"
                            className="invoice"
                            placeholder="₹00.00"
                            value={(item.quantity * item.rate) + (item.quantity * item.rate) * gst / 100}
                            readOnly
                        />
                    </div>
                ))}
                    <button type="submit" className="px-4 py-2 border-gray-300 text-custom-blue rounded">
                        + Add New Item
                    </button>
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
            </div>
        </main>
    );
};

export default InvoiceItems;
