import React, { useState } from 'react'
import { TfiPrinter } from "react-icons/tfi";
import { FaRegEdit } from "react-icons/fa";
// import { IoShareSocialOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PrintTotal from './PrintTotal';
import { IoIosArrowDown } from "react-icons/io";
import { LiaRupeeSignSolid } from "react-icons/lia";
// import api from "./api/quotationNo";
import { LuRedo } from "react-icons/lu";
import { LuUndo } from "react-icons/lu";


// import {
//     WhatsappShareButton,
//     WhatsappIcon, EmailShareButton,
//     EmailIcon,
// } from 'next-share'
import { Link } from 'react-router-dom';
import PrintQuotation from './PrintQuotation';
import PrintTop from './PrintTop';
import axios from "axios";

const InvoicePrint = ({ date, image, from, to, items, qno,setQno,disCount,setDisCount,total,setTotal }) => {

    const componentRef = useRef();
    // const [share, setShare] = useState(false);
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

    const handleDownloadPdf = async () => {
        const input = componentRef.current;
        const scale = window.devicePixelRatio || 1;
    
        try {
            const canvas = await html2canvas(input, { scale });
            const imgData = canvas.toDataURL('image/png');
    
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
    
            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
            if (imgHeight > pdfHeight) {
                let currentPosition = 0;
                while (currentPosition < imgHeight) {
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, -currentPosition, imgWidth, imgHeight);
                    currentPosition += pdfHeight;
                }
            } else {
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            }
    
            pdf.save('download.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
    
    const handleUndo = async () => {
        try {
            const newQno = qno - 1;
            await axios.put("http://localhost:5400/quotation", {
                newQno: newQno,
                oldQno: qno
            });
            setQno(newQno);
            console.log(newQno);  // Log the new quotation number
        } catch (error) {
            console.log(`Error updating quotation number: ${error.message}`);
        }
    };

    const handleRedo = async () => {
        try {
            const newQno = qno + 1;
            await axios.put("http://localhost:5400/quotation", {
                newQno: newQno,
                oldQno: qno
            });
            setQno(newQno);
            console.log(newQno);  // Log the new quotation number
        } catch (error) {
            console.log(`Error updating quotation number: ${error.message}`);
        }
    };

    return (
        <main className="p-6 " >
            <div className=" grid grid-cols-6 gap-6  float-right mx-12">
                <LuUndo className="sm:text-4xl text-2xl" onClick={handleUndo} />
                <LuRedo className="sm:text-4xl text-2xl" onClick={handleRedo} />
                <Link to="/invoice"> <FaRegEdit className="sm:text-4xl text-2xl" /></Link>
                {/* <IoShareSocialOutline className="sm:text-4xl text-2xl" onClick={() => setShare(!share)} /> */}

                <MdOutlineFileDownload className="sm:text-4xl text-2xl" onClick={handleDownloadPdf} />
                <ReactToPrint
                    trigger={() => {
                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                        // to the root node of the returned component as it will be overwritten.
                        return <TfiPrinter className="sm:text-4xl text-2xl"  />;
                    }}
                    content={() =>componentRef.current}
                    />
                
                {/* {share && (
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
                )} */}

            </div>
            <div  ref={componentRef} className="my-8 sm:m-12 p-6  border border-gray-700 rounded-xl">
                <PrintTop image={image} qno={qno} date={date} title="Invoice"  />
                <PrintQuotation from={from} to={to} TitleFrom="Billed From" TitleTo="Billed To" />
                <div className=" sm:mx-4 border rounded-2xl border-gray-700">
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
                    <div>
      {items.map((item, index) => (
        <div className="text-gray-500 bottom-b border-gray-300 " >
        <div key={index} className="sm:pl-12 sm:text-center sm:grid sm:grid-cols-8 grid grid-cols-2 gap-2 p-2  sm:text-sm ">
        <label className="sm:hidden" >Item:</label><label className="invoice" name="itemname" >{item.item}</label>
        <label className="sm:hidden" >GST:</label><label className="invoice" name="gst">{item.gst}</label>
        <label className="sm:hidden" >Quantity:</label><label className="invoice" name="quantity">{item.quantity}</label>
        <label className="sm:hidden" >Rate:</label><label className="invoice" name="rate"><LiaRupeeSignSolid className="inline"/>{(item.rate)}</label>
        <label className="sm:hidden" >Amount:</label><label className="invoice" name="amount"><LiaRupeeSignSolid className="inline"/>{(item.quantity * item.rate).toFixed(3)}</label>
        <label className="sm:hidden" >CGST:</label> <label className="invoice" name="cgst" ><LiaRupeeSignSolid className="inline"/>{((item.quantity * item.rate)*item.gst/100/2).toFixed(3)}</label>
        <label className="sm:hidden" >SGST:</label><label className="invoice" name="sgst" ><LiaRupeeSignSolid className="inline"/>{((item.quantity * item.rate)*item.gst/100/2).toFixed(3)}</label>
        <label className="sm:hidden" >Total:</label> 
          <div className="">
          <label className="item" name="total"><LiaRupeeSignSolid className="inline"/>{((item.quantity * item.rate)+(item.quantity * item.rate)*item.gst/100).toFixed(3)}</label>
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
            <h2 className="sm:ml-11 inline">Description:</h2>
            <label name="description" className="m-4 text-gray-500 text-xs">{item.description}</label>
          </>
        )}
        <hr/>
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
