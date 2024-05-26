import React, {useEffect,useState} from "react";
import "./assignorders.css"
import axios from 'axios'
import { toast } from 'react-toastify'


const url = "https://thankful-hill-0b5ec3803-27.westeurope.5.azurestaticapps.net/";

const Assignorders = () => {

//storing all the data from the database , we stre them in a state variable
const[list,setList]=useState([]);
const [productCategory,setProductCategory]= useState('');

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
const handleProductCategoryChange=(event)=>{
    setProductCategory(event.target.value.item);
};

const statusHandler = async(event,item)=>{
  console.log(item)
  const response= await axios.post(`${url}/api/order/status`,{
    orderId:item,
    STATUS:event.target.value
    
  
  })
  if(response.data.success){
    await fetchList();
    console.log(response.data)
  }
  console.log(event.target.value)

}


  return (
    <div className='list add flex-col'>
        <p>Assign Orders</p>
        <div className='list-table'>
        <div className='list-table-format title'>
            {/* <b>Product</b> */}
            <b>Name</b>
            <b>Status</b>
            <b>Price</b>
            {/* <b>Action</b> */}
            <b>Assign to:</b>
            
        </div>
        {list.map((item =>{
            return(
                <div key ={item._id} className ='list-table-format'> 
                    {/* <img src={`${url}/images/`+item._id.IMAGE} alt=""/> */}
                    <p>{`${item.ADDRESS.firstName} ${item.ADDRESS.lastName} ${item.ADDRESS.email}`}
                    <p>{`${item.ADDRESS.street} ${item.ADDRESS.city} ${item.ADDRESS.province}`}</p>
                    <p>{`${item.ADDRESS.country} Postal-Code: ${item.ADDRESS.postalcode} 0${item.ADDRESS.phone}`}</p></p>
                    {/* <p>{item.STATUS}</p> */}
                    <select onChange={(event)=>statusHandler(event, item._id)} value={item._id.STATUS}>
                      <option value="Order received">Order Recieved</option>
                      <option value="Processing Order"> Processing Order</option>
                      <option value="Order Shipped">Order Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <p>R{item.AMOUNT}</p>
                    {/* <p onClick={()=>removeProduct(item._id)} className='cursor'>X</p> */}
                    <p>

                    <select onSelect={list.map} name="spaza" onChange={handleProductCategoryChange} value={productCategory}  >
                            <option value= "Spaza 1">Spaza 1</option>
                            <option value= "Spaza 2">Spaza 2</option>
                            <option value= "Spaza 3">Spaza 3</option>
                            <option value= "Spaza 4">Spaza 4</option>
                          
                        </select></p>
                </div>
            )

        }))}

        </div>
    </div>
  )
}

export default Assignorders


// return (
//   <div className="basket">
//     {prods.map(prod => (
//       <div key={prod.id} className="basket-product">
//         {prod.ProductName} // here you can add the other jsx code aswell
//       </div>
//     ))}
//   </div>
// );