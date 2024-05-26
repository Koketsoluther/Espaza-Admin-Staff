import React, { useState } from 'react'
import './addproduct.css'
import axios from "axios"
import {toast} from "react-toastify"
import { FaCamera } from 'react-icons/fa';


const Add = () => {
const url = "https://us-central1-e-spazadb.cloudfunctions.net/func";
const [image,setImage] = useState(false);
const [data,setData] = useState({
    NAME: "",
    PRICE:"",
    STOCK:"",
    CATEGORY:"Other"
})
const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data,[name]:value}))
}

const handleImageChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        // Use the base64Image string for further processing
        console.log(base64Image);
        data[`image`] = base64Image;
      };
      reader.readAsDataURL(file);
    }
  };
  
//   return (
//     <input type="file" onChange={handleImageChange} />
//   );

const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("NAME",data.NAME)
    formData.append("STOCK",Number(data.STOCK))
    formData.append("PRICE",Number(data.PRICE))
    formData.append("CATEGORY",data.CATEGORY)
    formData.append("IMAGE",image)
    console.log(data);
    

    const response = await axios.post(`${url}/api/products/add`,{NAME: data.NAME, STOCK: Number(data.STOCK), PRICE: Number(data.PRICE), CATEGORY: data.CATEGORY, IMAGE: data.image});

    if(response.data.success){
        setData({
            NAME: "",
            STOCK: "",
            PRICE:"",
            CATEGORY:"Other" 
        })
        setImage(false)
        toast.success(response.data.message)
    }
    else{
        toast.error(response.data.message)
    }
}
    return (
        <div className='add'>
            <form className = "flex-col" onSubmit={onSubmitHandler}>
                <div className= "add-img-upload flex col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                    {image ? ( <img src={URL.createObjectURL(image)} alt="Uploaded" /> ) : (
          <>
            <FaCamera size="2rem" className="upload-icon" />
            
          </> )}
      </label>
                    {/* <input onChange={(e)=> setImage(e.target.files[0])} type= "file" id = "IMAGE" hidden="" required /> */}
                    <input type="file" onChange={handleImageChange} id = "IMAGE" hidden="" required />
                </div>
                <div className = "add-product-name flex-col">
                    <p> Product Name</p>
                    <input onChange={onChangeHandler}  defaultValue={data.NAME} type= "text" name='NAME' placeholder = 'Type here'/>
                </div>
               
                <div className='add-category-price'>
                    <div className='add-category flex col'>
                        <p>Product Category</p>
                        <select name="CATEGORY" onChange={onChangeHandler}  >
                            <option value= "Other">Other</option>
                            <option value= "Drinks">Drinks</option>
                            <option value= "Toiletries">Toiletries</option>
                            <option value= "Food">Food</option>
                          
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product price</p>
                        <input onChange={onChangeHandler}  defaultValue={data.PRICE} type = "Number" name='PRICE' placeholder = "R0.00"/>
                    </div>
                    <div className='add-price flex-col'>
                        <p>QUANTITY</p>
                        <input onChange={onChangeHandler}  defaultValue={data.STOCK} type = "Number" name='STOCK' placeholder = "0"/>
                    </div>
                </div>
                <button type= "submit" className='add-button'>Add</button>
            </form>
            
        </div>
    )
}

export default Add