import React, { useState } from 'react'
import ContentTop from './ContentTop';
import Quotation from './Quotation';
import Items from './Items';
import { Link, useNavigate } from 'react-router-dom';
import InvoiceItems from './InvoiceItems';
import InvoiceSumTotal from './InvoiceSumTotal';


const Invoice = ({to,setTo,date,setDate,image,setImage,from,setFrom,items,setItems,addItems,setAddItems,qno,disCount,setDisCount,total,setTotal}) => {
    const [error,setError]=useState({});
    

    const navigate=useNavigate();
    const handleContinue = (e) => {
        e.preventDefault();
        
        const errors = {};
        
        if (!from.name || !from.mobile) errors.fromName = "From: Enter the Feild  Correctly";
        if (!to.name || !to.mobile) errors.toName = "To: Enter the Feild  Correctly";
        
        if (Object.keys(errors).length > 0) {
          setError(errors);
          return;
        }
        
        
        setError('')
        navigate("/invoiceprint");

    }
    
    return (
        <main   className="m-20 p-4 border border-gray-700 rounded-xl">
            <ContentTop date={date} setDate={setDate} image={image} setImage={setImage}  title="Invoice" qno={qno} />
            <Quotation from={from} setFrom={setFrom} to={to} setTo={setTo} titleFrom="Billed From" titleTo="Billed To"/>
            <InvoiceItems items={items} setItems={setItems} addItems={addItems} setAddItems={setAddItems} />
            <InvoiceSumTotal items={items} disCount={disCount} setDisCount={setDisCount} total={total}
              setTotal={setTotal} />
            <div className="text-center">
                {error.fromName && <p className="text-red-500">{error.fromName}</p>}
                {error.toName && <p className="text-red-500">{error.toName}</p>}
                
            </div>
            <button onClick={handleContinue} className="m-8 px-4 text-2xl text-white flex float-right border-2 rounded-xl bg-custom-blue">Continue</button>
            
        </main>
    )
}

export default Invoice