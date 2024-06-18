import React, { useState, useRef } from 'react';
import { TfiPrinter } from "react-icons/tfi";
import { FaRegEdit } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import SumTotal from './SumTotal';
import { Link } from 'react-router-dom';
import api from "./api/quotationNo";
import { LuRedo } from "react-icons/lu";
import { LuUndo } from "react-icons/lu";
import {
    WhatsappShareButton,
    WhatsappIcon, 
    EmailShareButton,
    EmailIcon,
} from 'next-share';
import { IoIosArrowDown } from "react-icons/io";
import PrintQuotation from './PrintQuotation';
import PrintTop from './PrintTop';
import { LiaRupeeSignSolid } from "react-icons/lia";

const ContentPrint = ({ date, image, from, to, items, qno, setQno }) => {

    const componentRef = useRef();
    const [share, setShare] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
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
    
    const handleRedo = async () => {
        // try {
            const newQno = Number(qno)+1 ;
        //     await api.put("/qno",  { no: newQno } );
            setQno({no:newQno});
        //     console.log(qno)
        // } catch (error) {
        //     console.log(`Error updating quotation number: ${error.message}`);
        // }
    };

    const handleUndo = async () => {
        // try {
            const newQno = Number(qno)-1 ;
        //     await api.put("/qno",  { no: newQno } );
            setQno({no:newQno});
        //     console.log(qno)
        // } catch (error) {
        //     console.log(`Error updating quotation number: ${error.message}`);
        // }
    };

    const handleDownloadPdf = () => {
        const input = componentRef.current;
        const scale = window.devicePixelRatio || 1;

        html2canvas(input, { scale }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            if (imgHeight > pdfHeight) {
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, pdfHeight);
                let position = pdfHeight;
                while (position < imgHeight) {
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
                    position += pdfHeight;
                }
            } else {
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            }

            pdf.save('download.pdf');
        });
    };

    return (
        <main className="p-6">
            <div className=" grid grid-cols-6 gap-6  float-right mx-12 text-2xl sm:text-4xl">
            <LuUndo className="" onClick={handleUndo} />
                <LuRedo className="" onClick={handleRedo} />
                <Link to="/"> <FaRegEdit className="" /></Link>
                <IoShareSocialOutline className="" onClick={() => setShare(!share)} />

                <MdOutlineFileDownload className="" onClick={handleDownloadPdf} />
                <ReactToPrint
                    trigger={() => {
                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                        // to the root node of the returned component as it will be overwritten.
                        return <TfiPrinter className=""  />;
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
             <div ref={componentRef}>
            <div  className="my-8 sm:m-12 p-2 sm:p-6 border border-gray-500 rounded-xl text-gray-500 ">
            <PrintTop image={image} qno={qno} date={date} title={"Quotation"} />
               <PrintQuotation from={from} to={to} TitleFrom="Quotation From" TitleTo="Quotation To"/>
                <div className="border border-gray-500 rounded-xl sm:mx-4">
                    <header className="p-2 pl-4 bg-gray-600 grid grid-cols-5 list-none text-white rounded-t-xl text-sm sm:text-xl">
                        <li>Item</li>
                        <li>Quantity</li>
                        <li>Rate</li>
                        <li>Amount</li>
                        <li>Total</li>
                    </header>
                    {items.map((item) => (
            <div key={item.id} className="text-gray-500 border-b border-gray-400 rounded-xl">
              <div className="sm:px-12 grid grid-cols-2 sm:grid sm:grid-cols-5 gap-2 p-2">
              <label className="sm:hidden" >Item:</label><p className="item" name="itemname">{item.item}</p>
                <label className="sm:hidden" id="quantity">Quantity:</label><p className="item" name="quantity">{item.quantity}</p>
                <label className="sm:hidden" >Rate:</label><p className="item" name="rate"><LiaRupeeSignSolid className="inline"/>{(item.rate)}</p>
                <label className="sm:hidden">Amount:</label><p className="item" name="amount"><LiaRupeeSignSolid className="inline"/>{(item.quantity * item.rate).toFixed(2)}</p>
                <label className="sm:hidden" >Total:</label>
                                <label name="total"><span className="font-sans font-medium">₹ </span>{(item.total).toFixed(2)}</label>
                            </div>
                            <IoIosArrowDown
                                    className={`ml-11 cursor-pointer transform transition-transform duration-300 ${
                                    activeItemId[item.id] ? 'rotate-180' : ''
                                    }`}
                                    onClick={() => toggleDescription(item.id)}
                                />
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
            </div>
        </main>
    );
}

export default ContentPrint;
