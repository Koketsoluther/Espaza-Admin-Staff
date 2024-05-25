import React, { useState,useEffect } from 'react'
import "./listorders.css"
import axios from 'axios'
import { toast } from 'react-toastify'


const url = "https://us-central1-e-spazadb.cloudfunctions.net/func";

const List = () => {

//storing all the data from the database , we stre them in a state variable
const[list,setList]=useState([]);

 // should get a list with all the products
const fetchList = async( )=>{
    
    const response = await axios.get(`${url}/api/order/list`);
    if(response.data.success){
        setList(response.data.data);
        console.log(response.data)
    }
    else{
        toast.error("Error")
    }
}
useEffect(()=>{

    fetchList();
},[])
// const removeProduct = async(ProductID)=>{
//    const response= await axios.post(`${url}/api/product/remove`,{id:ProductID});
//    await fetchList();
   
//    if(response.data.success){
//     toast.success(response.data.message)
//    }
//    else{
//     toast.error("Error")
//    }
// }

const statusHandler = async (event, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, {
        orderId: orderId,
        STATUS: event.target.value,
    });
    if (response.data.success) {
        await fetchList();
        console.log(response.data);
    } else {
        console.error("Error updating order status");
    }
  };

  return (
    <div className='list add flex-col'>
        <p>All Order available</p>
        <div className='list-table'>
        <div className='list-table-format title'>
            
            <b>Order details</b>
            <b>Change Status</b>
            <b>Status</b>
            <b>Price</b>
            
        </div>
        {list.map((item =>{
            return(
                <div key ={item._id} className ='list-table-format'>
                    <p>{`${item.ADDRESS.firstName} ${item.ADDRESS.lastName} ${item.ADDRESS.email}`}
                    <p>{`${item.ADDRESS.street} ${item.ADDRESS.city} ${item.ADDRESS.province}`}</p>
                    <p>{`${item.ADDRESS.country} Postal-Code: ${item.ADDRESS.postalcode} 0${item.ADDRESS.phone}`}</p></p>
                    <select onChange={(event)=>statusHandler(event, item._id)} value={item._id.STATUS}>
                      <option value="Order received">Order Recieved</option>
                      <option value="Processing Order"> Processing Order</option>
                      <option value="Order Shipped">Order Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    
                    <p>{item.STATUS}</p>
                    <p>R{item.AMOUNT}</p>
                    {/* <p onClick={()=>removeProduct(item._id)} className='cursor'>X</p> */}
                </div>
            )

        }))}
        

        </div>
    </div>
  )
}

export default List


// return (
//   <div className="basket">
//     {prods.map(prod => (
//       <div key={prod.id} className="basket-product">
//         {prod.ProductName} // here you can add the other jsx code aswell
//       </div>
//     ))}
//   </div>
// );