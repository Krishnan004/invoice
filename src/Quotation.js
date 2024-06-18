import React from 'react';
import QuotationFrom from './QuotationFrom';
import QuotationTo from './QuotationTo';

const Quotation = ({ to, setTo, from, setFrom ,titleFrom,titleTo}) => {
    return (
        <div className="m-auto grid sm:grid-cols-2 gap-6 w-full p-8 2xl:gap-16 ">
            <QuotationFrom from={from} setFrom={setFrom} titleFrom={titleFrom} />
            <QuotationTo to={to} setTo={setTo} titleTo={titleTo}/>
        </div>
    );
};

export default Quotation;