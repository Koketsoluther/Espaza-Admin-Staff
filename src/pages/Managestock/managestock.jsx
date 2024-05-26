import React, {useState, useEffect} from 'react'
import './managestock.css'
import axios from "axios"
import {toast} from "react-toastify"
import { jsPDF } from 'jspdf';


const Manage = () => {
    const url = "https://thankful-hill-0b5ec3803-27.westeurope.5.azurestaticapps.net/"
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/products/list`);
            if (response.data.success) {
                setList(response.data.data);
                return response.data.data; // Return the data
            } else {
                toast.error('Error fetching the product list');
                return [];
            }
        } catch (error) {
            toast.error('Error fetching the product list');
            return [];
        }
    };

    const exportPDF = async () => {
        const items = await fetchList();
        if (items.length === 0) return;

        const doc = new jsPDF();
        doc.text(`Number of Products: ${items.length}`, 10, 10);

        let row1 = 10;
        items.forEach((item) => {
            doc.text(item.NAME, 10, row1);
            doc.text(item.STOCK, 10, row1);
            row1 += 10;
        });

        doc.save('Manage_stock.pdf');
    };

    useEffect(() => {
        fetchList();
    }, []);
    
    useEffect(()=>{
        fetchList();
    },[])
    return (
        <div className='list add flex-col'>
            <p>All product list</p>
            <div className='list-table'>
                <div className = "list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Quantity</b>
                </div>
                {list.map((item,index)=>{
                    return (
                       <div key={index} className='list-table-format'>
                            <img src={`${url}/images/`+item.IMAGE} alt = "" />
                            <p>{item.NAME}</p>
                            <p>{item.CATEGORY}</p>
                            <p>{item.STOCK}</p>
                            
                        </div>
                    )
                })}
            </div>
            <button onClick={() => exportPDF()}>Export as PDF</button>
        </div>
    )
}

export default Manage