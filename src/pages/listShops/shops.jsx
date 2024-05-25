import React, {useState, useEffect} from 'react'
import './shops.css'
import axios from "axios";
import jsPDF from "jspdf";
import {toast} from "react-toastify"
import { BsMenuButtonWideFill} from 'react-icons/bs'

const List = () => {
    const url = "https://us-central1-e-spazadb.cloudfunctions.net/func"
    const [list,setList] = useState([]);

    const fetchList =async () => {
        const response =await axios.get(`${url}/api/shop/list`);

        if(response.data.success){
            setList(response.data.data)
        }
        else{
            toast.error("error")
        }
    }

    const removeShop = async(ShopID) => {
        const response = await axios.post(`${url}/api/shop/remove`,{shopid:ShopID});
        await fetchList();
        if (response.data.success){
            toast.success(response.data.message)
        }
        else{
            toast.error("Error")
        }
    }
    
    
      const getOrderList = async (shopId) => {
        try {
          const response = await axios.get(`${url}/api/order/list`, { params: { shopId } });
          if (response.data.success) {
            return response.data.data;
          } else {
            toast.error('Error fetching orders list');
            return [];
          }
        } catch (error) {
          toast.error('Error fetching orders list');
          return [];
        }
      };

      const getStaffList = async (shopId) => {
        try {
          const response = await axios.get(`${url}/api/staff/list`, { params: { shopId } });
          if (response.data.success) {
            return response.data.data;
          } else {
            toast.error('Error fetching staff list');
            return [];
          }
        } catch (error) {
          toast.error('Error fetching staff list');
          return [];
        }
      };
    
    
      const exportPDF = async (shop) => {
        const orders = await getOrderList(shop._id);
        const staff = await getStaffList(shop._id);
        if (staff.length ===0 || orders.length === 0) return;

    
          const doc = new jsPDF();
          doc.text(`Shop Name: ${shop.NAME}`, 10, 10);
          doc.text(`Address: ${shop.ADDRESS}`, 10, 20);
          doc.text(`Owner: ${shop.SHOPOWNER}`, 10, 30);
          doc.text(`Number of Orders: ${orders.length}`, 10, 40);
          // let row1 = 20;
          // orders.forEach((order) => {
          //   doc.text(order.ADDRESS.street, 10, row1);
          //   row1 += 20;
          // });
          let row2 = 50
          doc.text(`Staff: ${String(staff.length)}`, 10, row2);
          
          // staff.forEach((staff) => {
          //   doc.text(staff.NAME, 10, row2+30);
          //   row2 += 30;
          // });
          doc.save(`${shop.NAME}_Shop_History.pdf`);
        
      }

    useEffect(()=>{
        fetchList();
    },[])

    

    return (
        <div className='list add flex-col'>
            <p>All Shops list</p>
            <div className='list-table'>
                <div className = "list-table-format title">
                    <b>Name</b>
                    <b>Address</b>
                    <b>Owner</b>
                    <b>Report</b>
                    <b>Action</b>
                </div>
                {list.map((shop,index)=>{
                    return (
                       <div key={index} className='list-table-format'>
                            <p>{shop.NAME}</p>
                            <p>{shop.ADDRESS}</p>
                            <p>{shop.SHOPOWNER}</p>
                            <p onClick={()=>exportPDF(shop)} className='cursor'> <BsMenuButtonWideFill className='icon'/> Reports</p>
                            <p onClick={()=>removeShop(shop._id)} className='cursor'>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List