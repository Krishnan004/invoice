import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";

const ContentTop = ({ date, setDate, image, setImage,title,qno }) => {



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileUpload = () => {
        document.getElementById('file-upload').click();
    };

    return (
        <div className="p-8  ">

            <h3 className="p-8 text-custom-blue text-3xl font-bold text-center block">{title}</h3>
            <div className="mx-8 my-2 relative">
                <label htmlFor="quotation_no" className=" inline block text-left font-medium text-custom-blue text-xl mt-4 mr-2">Quotation No.</label>
                {qno &&(
                <input type="text" className="top" id="quotation_no" placeholder="Enter Quotation No." value={`SPI${qno.toString().padStart(3, '0')}`}
                />)}
                <br />
                <label htmlFor="quotation_date" className="inline block text-left mt-4 font-medium text-custom-blue text-xl">Quotation Date</label>
                <input type="date" id="quotation_date" className="top" name=" quotation_date" placeholder="Select Date" value={date} onChange={(e) => setDate(e.target.value)} />
                <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
            <div
                className="absolute right-0 top-0  mr-16 cursor-pointer border border-dashed rounded-lg flex justify-center items-center w-46 h-34 border-gray-700"
                onClick={triggerFileUpload}
            >
                {image ? (
                   <div className="relative w-46 h-32">
                   <img src={image} alt="Uploaded" className="w-full h-full object-contain  " />
                   <button className="absolute top-0 right-0 text-custom-blue text-3xl ml-2">
                     <CiEdit />
                   </button>
                 </div>
                ) : (
                    <div >
                     <CiImageOn className="mx-16 text-2xl"/>
                        <span>Upload business logo</span>
                        </div>
                    )}
            </div>
            </div>

           

        </div>



    )
}

export default ContentTop
