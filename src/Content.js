import React, { useState } from 'react'
import ContentTop from './ContentTop';
import Quotation from './Quotation';
import Items from './Items';
import {  useNavigate } from 'react-router-dom';


const Content = ({to,setTo,date,setDate,image,setImage,from,setFrom,items,setItems,addItems,setAddItems,qno}) => {
    const [error,setError]=useState({});
    

    const navigate=useNavigate();
    const handleContinue = (e) => {
        e.preventDefault();
        
        const errors = {};
        
        if (!from.name  || !from.mobile ) errors.fromName = "From: Enter the Feild  Correctly";
        if (!to.name || !to.mobile) errors.toName = "To: Enter the Feild  Correctly";
        
        if (Object.keys(errors).length > 0) {
          setError(errors);
          return;
        }
        
        
        setError('')
        navigate("/continue");

    }
    
    return (
        <main  className="m-4 sm:m-20 sm:p-4 border border-gray-700 rounded-xl 2xl:text-2xl">
            <ContentTop date={date} setDate={setDate} image={image} setImage={setImage} qno={qno} title="Quotation"/>
            <Quotation from={from} setFrom={setFrom} to={to} setTo={setTo} titleFrom="Quotation From" titleTo="Quotation To"/>
            <Items items={items} setItems={setItems} addItems={addItems} setAddItems={setAddItems}  />
            <div className="text-center">
                {error.fromName && <p className="text-red-500">{error.fromName}</p>}
                {error.toName && <p className="text-red-500">{error.toName}</p>}
                
            </div>
            <button onClick={handleContinue} className="m-8 px-4 sm:text-2xl text-white flex float-right border-2 rounded-xl bg-custom-blue">Continue</button>
            
        </main>
    )
}

export default Content
