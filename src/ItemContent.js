import React, { useState } from 'react';
import SumTotal from './SumTotal';

const ItemContent = ({ items, setItems }) => {
    const [showTextarea, setShowTextarea] = useState(false);
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [rate, setRate] = useState(0);
    const [description, setDescription] = useState('');

    const handleButtonClick = () => {
        setShowTextarea(!showTextarea);
    };

    const handleAddItems = () => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const total = quantity * rate;
        const listItems = { id, item: itemName, quantity, rate, total, description };
        const updatedItems = [...items, listItems];
        setItems(updatedItems);
        setItemName('');
        setRate(0);
        setQuantity(0);
        setDescription('');
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        setItems(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems[index] = { ...updatedItems[index], [name]: value };
            if (name === 'quantity' || name === 'rate') {
                updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].rate;
            }
            return updatedItems;
        });
    };

    return (
        <main>
            <form onSubmit={handleAddItems} className="">
                {items.map((item, index) => (
                    <div key={index} className="sm:grid sm:grid-cols-5 gap-2">
                        <input
                            type="text"
                            name="item"
                            id="item"
                            placeholder="Item name"
                            value={item.item}
                            onChange={e => handleChange(index, e)}
                        />
                        <input
                            type="number"
                            name="quantity"
                            id="item"
                            placeholder="Quantity"
                            value={item.quantity}
                            onChange={e => handleChange(index, e)}
                        />
                        <input
                            type="number"
                            name="rate"
                            id="item"
                            placeholder="₹00.00"
                            value={item.rate}
                            onChange={e => handleChange(index, e)}
                        />
                        <input
                            type="text"
                            name="amount"
                            id="item"
                            placeholder="₹00.00"
                            readOnly
                            value={item.quantity * item.rate}
                        />
                        <input
                            type="text"
                            name="total"
                            id="item"
                            placeholder="₹00.00"
                            readOnly
                            value={item.total}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddItems}
                className="px-4 py-2 border-gray-300 text-gray-600 rounded"
                >
                    + Add
                </button>
            </form>
            <div className="border-b border-gray-300">
                <button
                    onClick={handleButtonClick}
                    className="px-4 py-2 border-gray-300 text-gray-600 rounded"
                >
                    + Description
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
            <SumTotal items={items} />
        </main>
    );
};

export default ItemContent;
