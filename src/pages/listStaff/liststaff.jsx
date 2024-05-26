import React, { useState,useEffect } from 'react'
import "./liststaff.css"
import axios from 'axios'
import { toast } from 'react-toastify'


const url = "https://us-central1-e-spazadb.cloudfunctions.net/func";



const ListStaff = () => {
    // const getShop = async (shopId) => {
    //     try {
    //       const response = await axios.get(`${url}/api/shops/shop`, { shopid: shopId });
    //       if (response.data.success) {
    //         console.log(response.data.data);
    //         return response.data.data;
    //     } else {
    //         toast.error('Error fetching shop details');
    //         return null;
    //     }
    // } catch (error) {
    //     toast.error('Error fetching shop details');
    //     return null;
    // }
    //   };
    
//storing all the data from the database , we stre them in a state variable
const[list,setList]=useState([]);
 // should get a list with all the products
const fetchList = async( )=>{
    
    const response = await axios.get(`${url}/api/staff/list`);
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


  return (
    <div className='list add flex-col'>
        <p>Staff Memebers</p>
        <div className='list-table'>
        <div className='list-table-format title'>
            
            <b>Name</b>
            <b>Surname</b>
            
            <b>ID</b>
            <b>Email</b>
            
            
            
        </div>
        {list.map((item =>{
            
            return(
                
                <div key ={item._id} className ='list-table-format'>
                    
                    <p>{item.NAME}</p>
                     <p>{item.SURNAME }</p>
                     
                     
                
                    
                    <p>{item.ID}</p>
                    <p>{item.EMAIL}</p>
                   
                </div>
            )

        }))}

        </div>
    </div>
  )
}

export default ListStaff


// return (
//   <div className="basket">
//     {prods.map(prod => (
//       <div key={prod.id} className="basket-product">
//         {prod.ProductName} // here you can add the other jsx code aswell
//       </div>
//     ))}
//   </div>
// );