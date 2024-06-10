import {createContext,useState,useEffect} from "react";

const DataContext=createContext({})

export const DataProvider=({children})=>{

    const [items,setItems]=useState([])
  const [addItems,setAddItems]=useState([]);
    return(
        <DataContext.Provider value={{
            items,setItems,addItems,setAddItems
        }}>
        {children}
        </DataContext.Provider>
    )
}

export default DataContext