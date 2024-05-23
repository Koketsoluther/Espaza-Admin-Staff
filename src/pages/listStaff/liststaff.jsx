import React, { useState,useEffect } from 'react'
import "./liststaff.css"
import axios from 'axios'
import { toast } from 'react-toastify'


const url = "http://localhost:4000";

const ListStaff = () => {

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
        <p>Staff Memebers</p>
        <div className='list-table'>
        <div className='list-table-format title'>
            
            <b>Name</b>
            <b>Surname</b>
            <b>Shop</b>
            <b>ID</b>
            <b>Email</b>
            
            
            
        </div>
        {list.map((item =>{
            return(
                <div key ={item._id} className ='list-table-format'>
                    {/* <img src={`${url}/images/`+item._id.IMAGE} alt=""/> */}
                    <p>{item.NAME}</p>
                     <p>{item.SURNAME }</p>
                     <p>{item.SHOP}</p>
                
                    
                    <p>{item.ID}</p>
                    <p>{item.EMAIL}</p>
                    {/* <p onClick={()=>removeProduct(item._id)} className='cursor'>X</p> */}
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