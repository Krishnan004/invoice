import React, { useState, useRef } from 'react';
import { TfiPrinter } from "react-icons/tfi";
import { FaRegEdit } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import SumTotal from './SumTotal';
import { Link } from 'react-router-dom';
import api from "./api/quotationNo";
import {
    WhatsappShareButton,
    WhatsappIcon, 
    EmailShareButton,
    EmailIcon,
} from 'next-share';
import { IoIosArrowDown } from "react-icons/io";

const ContentPrint = ({ date, image, from, to, items, qno, setQno }) => {

    const componentRef = useRef();
    const [share, setShare] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const [descriptionVisible, setDescriptionVisible] = useState({});

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

    const toggleDescription = (id) => {
        setDescriptionVisible(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleDownload = () => {
        const input = document.getElementById('quotation');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save("download.pdf");
            });
    };

    return (
        <main className="p-6">
            <div className="w-full flex gap-4 m-2 mx-4">
                <Link to="/"><FaRegEdit className="text-2xl sm:text-4xl" /></Link>
                <IoShareSocialOutline className="text-2xl sm:text-4xl" onClick={() => setShare(!share)} />
                <MdOutlineFileDownload className="text-2xl sm:text-4xl" onClick={handleDownload} />
                <TfiPrinter className="text-2xl sm:text-4xl" onClick={handlePrint} />
            </div>
            {share && (
                <div className="flex space-x-2 m-2">
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
                </div>
            )}
            <div className="m-4 p-4 border border-gray-500 rounded-xl text-gray-500 ">
                <h3 className="p-4 text-gray-600 text-xl text-center sm:text-2xl font-bold">Quotation</h3>
                <div className="mx-4 my-4">
                    <div className="flex flex-col sm:flex-row justify-between">
                        <div>
                            <label htmlFor="quotation_no" className="text-gray-600  mt-4">Quotation No.</label>
                            <label>{`SPI${qno.toString().padStart(3, '0')}`}</label>
                            <br />
                            <label htmlFor="quotation_date" className="text-gray-600  mt-4">Quotation Date: </label>
                            <label htmlFor="quotation_date" >{date}</label>
                        </div>
                        <div className="flex justify-end mt-4 sm:mt-0">
                            <img src={image} alt="Uploaded" className="w-40 h-20 sm:w-80 sm:h-24 object-contain" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-4 my-4">
                    <div className="p-4 border border-gray-500 rounded-xl">
                        <h2 className="text-gray-600 text-xl sm:text-2xl font-bold">Quotation From</h2>
                        <h3 className="my-2 text-gray-600 text-xl sm:text-2xl font-bold">{from.name}</h3>
                        <address>
                            <label>{from.address}</label><br />
                            <label >{from.city} {from.state}</label><br/>
                            <label>{from.pincode}</label>
                        </address>
                        {from.email && (
                            <>
                                <label className="text-gray-600 text-xl sm:text-2xl font-bold">Email:</label>
                                <label>{from.email}</label><br /><br />
                            </>
                        )}
                        <label className="text-gray-600 text-xl sm:text-2xl font-bold">Phone No:</label>
                        <label>{from.mobile}</label><br />
                    </div>
                    <div className="p-4 border border-gray-500 rounded-xl">
                        <h2 className="text-gray-600 text-xl sm:text-2xl font-bold">Quotation To</h2>
                        <h3 className="my-2 text-gray-600 text-xl sm:text-2xl font-bold">{to.name}</h3>
                        <address>
                            <label>{to.address}</label><br />
                            <label >{to.city} {to.state}</label><br/>
                            <label>{to.pincode}</label>
                        </address>
                        {to.email && (
                            <>
                                <label className="text-gray-600 text-xl sm:text-2xl font-bold">Email:</label>
                                <label>{to.email}</label><br /><br />
                            </>
                        )}
                        <label className="text-gray-600 text-xl sm:text-2xl font-bold">Phone No:</label>
                        <label>{to.mobile}</label><br />
                    </div>
                </div>
                <div className="border border-gray-500 rounded-xl mx-4">
                    <header className="p-2 pl-4 bg-gray-600 grid grid-cols-5 list-none text-white rounded-t-xl text-sm sm:text-xl">
                        <li>Item</li>
                        <li>Quantity</li>
                        <li>Rate</li>
                        <li>Amount</li>
                        <li>Total</li>
                    </header>
                    {items.map((item, index) => (
                        <div key={index} className="text-gray-500 border-b p-2 pl-4">
                            <div className="grid grid-cols-5 gap-2 text-xs sm:text-sm" onClick={() => setShowDescription(!showDescription)}>
                                <label name="itemname">{item.item}</label>
                                <label name="quantity">{item.quantity}</label>
                                <label name="rate">₹{item.rate}</label>
                                <label name="amount">₹{item.quantity * item.rate}</label>
                                <label name="total">₹{item.total}</label>
                            </div>
                            <IoIosArrowDown className="ml-1 cursor-pointer" onClick={() => toggleDescription(item.id)} />
                            {descriptionVisible[item.id] && (
                                <>
                                    <h2 className="ml-1 inline">Description:</h2>
                                    <label name="description" className="m-2 text-gray-500 text-xs">{item.description}</label>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <SumTotal items={items} />
            </div>
        </main>
    );
}

export default ContentPrint;
