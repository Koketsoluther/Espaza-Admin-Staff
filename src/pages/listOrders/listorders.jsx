import React, { useState,useEffect } from 'react'
import "./listorders.css"
import axios from 'axios'
import { toast } from 'react-toastify'


const url = "https://thankful-hill-0b5ec3803-27.westeurope.5.azurestaticapps.net/";

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


  return (
    <div className='list add flex-col'>
        <p>All Order available</p>
        <div className='list-table'>
        <div className='list-table-format title'>
            
            <b>Name</b>
            <b>Status</b>
            <b>Price</b>
            
        </div>
        {list.map((item =>{
            return(
                <div key ={item._id} className ='list-table-format'>
                    {/* <img src={`${url}/images/`+item._id.IMAGE} alt=""/> */}
                    <p>{`${item.ADDRESS.firstName} ${item.ADDRESS.lastName} ${item.ADDRESS.email}`}
                    <p>{`${item.ADDRESS.street} ${item.ADDRESS.city} ${item.ADDRESS.province}`}</p>
                    <p>{`${item.ADDRESS.country} Postal-Code: ${item.ADDRESS.postalcode} 0${item.ADDRESS.phone}`}</p></p>
                    
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