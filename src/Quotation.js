import React from 'react';
import QuotationFrom from './QuotationFrom';
import QuotationTo from './QuotationTo';

const Quotation = ({ to, setTo, from, setFrom ,titleFrom,titleTo}) => {
    return (
        <div className="m-auto grid grid-cols-2 gap-6 w-fit p-8">
            <QuotationFrom from={from} setFrom={setFrom} titleFrom={titleFrom} />
            <QuotationTo to={to} setTo={setTo} titleTo={titleTo}/>
        </div>
    );
};

export default Quotation;