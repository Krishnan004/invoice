import React, { useState } from 'react'
import { TfiPrinter } from "react-icons/tfi";
import { FaRegEdit } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import InvoiveListItems from './InvoiveListItems';
import InvoiceSumTotal from './InvoiceSumTotal';
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { LiaRupeeSignSolid } from "react-icons/lia";
import api from "./api/quotationNo";
import {
    WhatsappShareButton,
    WhatsappIcon, EmailShareButton,
    EmailIcon,
} from 'next-share'
import { Link } from 'react-router-dom';

const InvoicePrint = ({ date, image, from, to, items, qno,setQno }) => {

    const componentRef = useRef();
    const [share, setShare] = useState(false);
    const [descriptionVisible, setDescriptionVisible] = useState({});

    const toggleDescription = (id) => {
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

    const handlePrint = async () => {
        window.print();
        try {
            const newQno = Number(qno)+1 ;
            await api.put("/qno",  { no: newQno } );
            setQno({no:newQno});
            console.log(qno)
        } catch (error) {
            console.log(`Error updating quotation number: ${error.message}`);
        }
    };

    return (
        <main className="p-6 ">
            <div className="w-28 grid grid-cols-4 gap-16 m-2 mx-12">
                <Link to="/invoice"> <FaRegEdit className="text-4xl" /></Link>
                <IoShareSocialOutline className="text-4xl" onClick={() => setShare(!share)} />

                <MdOutlineFileDownload className="text-4xl" onClick={handlePrint} />
                <TfiPrinter className="text-4xl" onClick={handlePrint} />
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
            <div className="m-12 p-6 border-2 rounded-xl text-gray-500  ">
                <h3 className="p-8 text-gray-600 text-2xl  font-bold ">Invoice</h3>
                <div className="mx-8 my-8">
                    <label htmlFor="quotation_no" className=" text-gray-600 inline block text-left mt-4">Quotation No.</label>
                    <label>{`SPI${qno.toString().padStart(3, '0')}`}</label>
                    <br />
                    <label htmlFor="quotation_date" className="text-gray-600 inline block text-left mt-4">Quotation Date: </label>
                    <label htmlFor="quotation_date" className="">{date}</label>
                    <image className="flex float-right -mt-28 mr-8">
                        <img src={image} alt="Uploaded" className=" w-80 h-24 object-contain" />
                    </image>
                </div>

                <quotation className="mx-auto grid grid-cols-2 gap-4 w-max-92  p-8">
                    <from className=" p-8 border-2 rounded-xl">
                        <h2 className="p-2 text-gray-600 text-2xl font-bold">Billed From</h2>

                        <h3 className="p-2 my-2 text-gray-600 text-2xl font-bold">{from.name}</h3>
                        <address className="p-2">
                            <label >{from.address}</label><br />
                            <label >{from.city} {from.state}</label><br/>
                            <label>{from.pincode}</label>
                        </address>
                        {from.email && (
                            <>
                                <label className="p-2 text-gray-600 text-2xl font-bold">Email:</label>
                                <label >{from.email}</label><br /><br />
                            </>
                        )}

                        <label className="p-2 text-gray-600 text-2xl font-bold">Phone No:</label>
                        <label>{from.mobile}</label><br />
                    </from>
                    <to className=" p-8 border-2 rounded-xl">
                        <h2 className="p-2 text-gray-600 text-2xl font-bold">Billed To</h2>

                        <h3 className="p-2 my-2 text-gray-600 text-2xl font-bold">{to.name}</h3>
                        <address className="p-2">
                            <label >{to.address}</label><br />
                            <label >{to.city} {to.state}</label><br/>
                            <label>{to.pincode}</label>
                        </address>
                        {from.email && (
                            <>
                                <label className="p-2 text-gray-600 text-2xl font-bold">Email:</label>
                                <label >{to.email}</label><br /><br />
                            </>
                        )}
                        <label className="p-2 text-gray-600 text-2xl font-bold">Phone No:</label>
                        <label>{to.mobile}</label><br />
                    </to>
                </quotation>
                <div className=" mx-8">
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
                    <div className="border  rounded-b-2xl 4">
                        {items.map((item, index) => (
                            <div className="text-gray-500 bottom-b border-gray-300 " >
                                <div key={index} className="pl-12 text-center grid grid-cols-8 gap-2 p-2 ">
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
                                <IoIosArrowDown className="ml-11 cursor-pointer" onClick={() => toggleDescription(item.id)} />
                                {descriptionVisible[item.id] && (
                                    <>
                                        <h2 className="ml-11 inline">Description:</h2>
                                        <label name="description" className="m-4 text-gray-500 text-xs">{item.description}</label>
                                    </>
                                )}

                            </div>
                        ))}

                    </div>
                <InvoiceSumTotal items={items} />
                </div>
            </div>
            

        </main>
    )
}

export default InvoicePrint
