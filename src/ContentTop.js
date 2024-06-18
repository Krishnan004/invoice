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
        <div className="m-2  sm:p-8 text-xs sm:text-xl 2xl:text-2xl ">

            <h3 className="m-2 sm:p-8 text-custom-blue  font-bold text-center block">{title}</h3>
            <div
                className="m-4 cursor-pointer border border-dashed rounded-lg border-gray-700 w-20 h-20 sm:hidden"
                onClick={triggerFileUpload}
            >
                {image ? (
                   <div className="relative w-20 h-20">
                   <img src={image} alt="Uploaded" className="w-full h-full object-contain  " />
                   <button className="absolute top-0 right-0 text-custom-blue  ml-2">
                     <CiEdit />
                   </button>
                 </div>
                ) : (
                    <div >
                     <CiImageOn className="mx-16"/>
                        <span>Upload business logo</span>
                        </div>
                    )}
            </div>
            <div className="m-6 relative">
                <label htmlFor="quotation_no" className=" inline block text-left font-medium text-custom-blue  mt-4 mr-2">Quotation No : </label>
                {qno &&(
                 <label>{`SPI${qno.toString().padStart(3, '0')}`}</label>
                 )}
                <br />
                <label htmlFor="quotation_date" className="inline block text-left mt-4 font-medium text-custom-blue ">Quotation Date :</label>
                <input
                    type="date"
                    id="quotation_date"
                    className="top"
                    name="quotation_date"
                    placeholder="Select Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
            <div
                className="m-4 absolute right-0 top-0  mr-16 cursor-pointer border border-dashed rounded-lg flex justify-center items-center sm:w-46 sm:h-34 border-gray-700 hidden sm:block"
                onClick={triggerFileUpload}
            >
                {image ? (
                   <div className="relative sm:w-46 sm:h-32">
                   <img src={image} alt="Uploaded" className="w-full h-full object-contain  " />
                   <button className="absolute top-0 right-0 text-custom-blue  ml-2">
                     <CiEdit />
                   </button>
                 </div>
                ) : (
                    <div >
                     <CiImageOn className="mx-16"/>
                        <span>Upload business logo</span>
                        </div>
                    )}
            </div>
            </div>

           

        </div>



    )
}

export default ContentTop
