import React, { useRef, useState } from 'react';
import { Header, Footer, Table } from "./components";
import './App.css';
import { FaInfoCircle } from "react-icons/fa";
import Papa from "papaparse";

interface Props {
  "Customer ID": string
  "Customer First Name": string
  "Order Value": string
  "Voucher Amount": number | null
  "Validity (days)": number | null
}

function App() {
  const ref = useRef<HTMLInputElement>(null);
  const [customerData, setCustomerData] = useState<any[]>([]);
  const [voucherData, setVoucherData] = useState<Props[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      Papa.parse(e.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setCustomerData(results.data as any[]);
        },
      })
    }
  }

  const getVoucher = (order: number): { validity: number, amount: number } => {
    if (order < 1000) {
      return { validity: null, amount: null }
    }
    if (1000 <= order && order < 5000) {
      return { validity: 1, amount: 100 }
    }
    if (5000 <= order && order < 10000) {
      return { validity: 5, amount: 500 }
    }
    if (10000 <= order) {
      return { validity: 10, amount: 1000 }
    }
  }
  const generateVoucher = (e: React.MouseEvent) => {
    const headers = Object.keys(customerData[0]);
    const temp: Props[] = customerData.map(t => ({
      "Customer ID": t[headers[0]],
      "Customer First Name": t[headers[1]],
      "Order Value": t[headers[2]],
      "Voucher Amount": getVoucher(Number(t[headers[2]])).amount,
      "Validity (days)": getVoucher(Number(t[headers[2]])).validity
    }))
    setVoucherData(temp)
  }

  return (
    <div className='page'>
      <Header />
      <div className="body">
        <div className="content">
          <div className="description">
            <FaInfoCircle />
            <div style={{ marginLeft: 10 }}>
              Please upload a Customer list.
            </div>
          </div>
          <input type="file" ref={ref} hidden accept=".csv" onChange={handleChange} />
          <button className="upload-button" onClick={() => ref.current?.click()}>Upload Customers</button>
          <Table data={customerData} />
          {customerData.length ? <button className='upload-button generate-voucher' onClick={generateVoucher}>Generate Voucher</button> : null}
          <Table data={voucherData} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
