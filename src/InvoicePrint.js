import React, { useState } from 'react'
import { TfiPrinter } from "react-icons/tfi";
import { FaRegEdit } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { useRef } from 'react';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import InvoiveListItems from './InvoiveListItems';
import PrintTotal from './PrintTotal';
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { LiaRupeeSignSolid } from "react-icons/lia";
import api from "./api/quotationNo";
import { LuRedo } from "react-icons/lu";
import { LuUndo } from "react-icons/lu";


import {
    WhatsappShareButton,
    WhatsappIcon, EmailShareButton,
    EmailIcon,
} from 'next-share'
import { Link } from 'react-router-dom';
import PrintQuotation from './PrintQuotation';
import PrintTop from './PrintTop';

const InvoicePrint = ({ date, image, from, to, items, qno,setQno,disCount,setDisCount,total,setTotal }) => {

    const componentRef = useRef();
    const [share, setShare] = useState(false);
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

    const handlToePrint = useReactToPrint({
        content: () => componentRef.current,
        onAfterPrint: () => handleDownloadPdf(),
    });

    const handleDownloadPdf = () => {
        const input = componentRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('download.pdf');
        });
    };

    const handleRedo = async () => {
        try {
            const newQno = Number(qno)+1 ;
            await api.put("/qno",  { no: newQno } );
            setQno({no:newQno});
            console.log(qno)
        } catch (error) {
            console.log(`Error updating quotation number: ${error.message}`);
        }
    };

    const handleUndo = async () => {
        try {
            const newQno = Number(qno)-1 ;
            await api.put("/qno",  { no: newQno } );
            setQno({no:newQno});
            console.log(qno)
        } catch (error) {
            console.log(`Error updating quotation number: ${error.message}`);
        }
    };

    return (
        <main className="p-6 " >
            <div className=" grid grid-cols-6 gap-6  float-right mx-12">
                <LuUndo className="text-4xl" onClick={handleUndo} />
                <LuRedo className="text-4xl" onClick={handleRedo} />
                <Link to="/invoice"> <FaRegEdit className="text-4xl" /></Link>
                <IoShareSocialOutline className="text-4xl" onClick={() => setShare(!share)} />

                <MdOutlineFileDownload className="text-4xl" onClick={handleDownloadPdf} />
                <ReactToPrint
                    trigger={() => {
                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                        // to the root node of the returned component as it will be overwritten.
                        return <TfiPrinter className="text-4xl"  />;
                    }}
                    content={() =>componentRef.current}
                    />
                
                {share && (
                    <>
                        <WhatsappShareButton
                            url={'https://github.com/next-share'}
                            title={'next-share is a social share buttons for your next React apps.'}
                            separator=":: "
                        >
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        <EmailShareButton
                            url={'https://github.com/next-share'}
                            subject={'Next Share'}
                            body="body"
                        >
                            <EmailIcon size={32} round />
                        </EmailShareButton>
                    </>
                )}

            </div>
            <div  ref={componentRef} className="m-12 p-6  border border-gray-700 rounded-xl">
                <PrintTop image={image} qno={qno} date={date} title="Invoice"  />
                <PrintQuotation from={from} to={to} TitleFrom="Billed From" TitleTo="Billed To" />
                <div className=" mx-4 ">
                    <header className="pl-2 bg-custom-blue grid grid-cols-8 list-none text-white rounded-t-2xl text-center text-xl py-6 mt-0">
                        <li>Item</li>
                        <li>GST</li>
                        <li>Quantity</li>
                        <li>Rate</li>
                        <li>Amount</li>
                        <li>CGST</li>
                        <li>SGST</li>
                        <li>Total</li>
                    </header>
                    <div className="border  border-gray-500  rounded-b-2xl ">
                        {items.map((item, index) => (
                            <div className="border-b rounded-b-2xl border-gray-300 text-gray-500  " >
                                <div key={index} className=" pl-12 text-center grid grid-cols-8 gap-2 p-2 text-xs sm:text-sm">
                                    <label className="invoice" name="itemname">{item.item}</label>
                                    <label className="invoice" name="gst">{item.gst}</label>
                                    <label className="invoice" name="quantity">{item.quantity}</label>
                                    <label className="invoice" name="rate"><LiaRupeeSignSolid className="inline"/>{item.rate}</label>
                                    <label className="invoice" name="amount"><LiaRupeeSignSolid className="inline"/>{(item.quantity * item.rate).toFixed(3)}</label>
                                    <label className="invoice" name="cgst" ><LiaRupeeSignSolid className="inline"/>{(((item.quantity * item.rate) * item.gst / 100 / 2).toFixed(3))}</label>
                                    <label className="invoice" name="sgst" ><LiaRupeeSignSolid className="inline"/>{((item.quantity * item.rate) * item.gst / 100 / 2).toFixed(3)}</label>
                                    <div className="">
                                        <label className="item" name="total"><LiaRupeeSignSolid className="inline"/>{((item.quantity * item.rate) + (item.quantity * item.rate) * item.gst / 100).toFixed(3)}</label>
                                    </div>
                                </div >
                                <IoIosArrowDown
                                    className={`ml-11 cursor-pointer transform transition-transform duration-300 ${
                                    activeItemId[item.id] ? 'rotate-180' : ''
                                    }`}
                                    onClick={() => toggleDescription(item.id)}
                                />
                                {descriptionVisible[item.id] && (
                                    <>
                                        <h2 className="ml-11 inline">Description:</h2>
                                        <label name="description" className="m-4 text-gray-500 text-xs">{item.description}</label>
                                    </>
                                )}

                            </div>
                        ))}

                    </div>
                    
                <PrintTotal items={items} disCount={disCount} setDisCount={setDisCount} total={total} setTotal={setTotal} />
                </div>
            </div>
            

        </main>
    )
}

export default InvoicePrint
