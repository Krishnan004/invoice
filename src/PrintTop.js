import React from 'react'

const PrintTop = ({qno,date,image,title}) => {
    return (
        <div>
            <h3 className="p-8 text-gray-600 text-2xl  font-bold ">{title}</h3>
                <div className="mx-8 my-8">
                    <label htmlFor="quotation_no" className=" text-gray-600 inline block text-left font-medium mt-4">Quotation No : </label>
                    <label>{`SPI${qno.toString().padStart(3, '0')}`}</label>
                    <br />
                    <label htmlFor="quotation_date" className="text-gray-600 inline block text-left font-medium mt-4">Quotation Date : </label>
                    <label htmlFor="quotation_date" className="">{date}</label>
                    {image&&(
                    <image className="flex float-right -mt-28 mr-8">
                        <img src={image} alt="Logo not uploded" className=" w-40 h-40 object-contain" />
                    </image>
                    )}
                </div>
        </div>
    )
}

export default PrintTop
