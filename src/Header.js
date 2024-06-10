import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header  className="p-8 flex bg-custom-blue text-white justify-center items-center text-xl ">
            <Link to="/"><h3 className="mx-4">Quotation</h3></Link>
            <Link to="/invoice"><h3 className="mx-4">Invoice</h3></Link>
            
        </header>
    )
}

export default Header
