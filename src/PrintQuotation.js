import React from 'react'

const PrintQuotation = ({from,to,TitleFrom,TitleTo}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-4 my-4">
        <div className="p-4 border border-gray-500 rounded-xl">
            <h2 className="text-gray-600 text-xl sm:text-2xl font-bold"> {TitleFrom}</h2>
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
            <h2 className="text-gray-600 text-xl sm:text-2xl font-bold"> {TitleTo}</h2>
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
    )
}

export default PrintQuotation
