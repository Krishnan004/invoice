import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Content from './Content';
import { Routes, Route } from "react-router-dom";
import ContentPrint from './ContentPrint';
import Invoice from './Invoice';
import InvoicePrint from './InvoicePrint';
import api from "./api/quotationNo";
import Loading from './Loading';

function App() {
  const [items, setItems] = useState([]);
  const [addItems, setAddItems] = useState([]);
  const [from, setFrom] = useState({});
  const [to, setTo] = useState({});
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(null);
  const [qno, setQno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [disCount, setDisCount] = useState(0);
  const [total,setTotal]=useState(0);

  useEffect(() => {
    const fetchQuotationNo = async () => {
      try {
        const response = await api.get('/qno');
        setQno(response.data);
        
      } catch (error) {
        console.log(`Error updating quotation number: ${error.message}`);
      } finally {
        // Simulate 2 seconds delay
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
    fetchQuotationNo();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className=" font-poppins text-custom-blue">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Content
              items={items}
              setItems={setItems}
              addItems={addItems}
              setAddItems={setAddItems}
              from={from}
              setFrom={setFrom}
              image={image}
              setImage={setImage}
              setDate={setDate}
              date={date}
              to={to}
              setTo={setTo}
              qno={qno ? qno.no : ''}
            />
          }
        />
        <Route
          path="/continue"
          element={<ContentPrint date={date} from={from} to={to} items={items} image={image} qno={qno ? qno.no : ''} setQno={setQno} />}
        />
        <Route
          path="/invoice"
          element={
            <Invoice
              items={items}
              setItems={setItems}
              addItems={addItems}
              setAddItems={setAddItems}
              from={from}
              setFrom={setFrom}
              image={image}
              setImage={setImage}
              setDate={setDate}
              date={date}
              to={to}
              setTo={setTo}
              disCount={disCount} setDisCount={setDisCount}
              total={total}
              setTotal={setTotal}
              qno={qno ? qno.no : ''}
            />
          }
        />
        <Route
          path="/invoiceprint"
          element={<InvoicePrint date={date} from={from} to={to} items={items} image={image}  qno={qno ? qno.no : ''} setQno={setQno} disCount={disCount} setDisCount={setDisCount} total={total}
          setTotal={setTotal} />}
        />
      </Routes>
    </div>
  );
}

export default App;
