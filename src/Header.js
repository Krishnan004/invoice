import React from 'react'
import { Link } from "react-router-dom";

const Header = ({resetStates}) => {

    const handleState=()=>{
        window.location.reload();
      }

    return (
        <header  className="p-4 sm:p-8 flex bg-custom-blue text-white justify-center items-center  lg:text-lg xl:text-xl 2xl:text-2xl">
            <Link to="/"><h3 className="mx-4" onClick={resetStates}>Quotation</h3></Link>
            <Link to="/invoice"><h3 className="mx-4"onClick={resetStates} >Invoice</h3></Link>
            
        </header>
    )
}

export default Header
