import React, { useState } from 'react'
import './addshop.css'
import axios from 'axios'
import {toast} from "react-toastify"


const Add = () => {
const url = "https://us-central1-e-spazadb.cloudfunctions.net/func"

const [data,setData] = useState({
    name: "",
    address:"",
    ownername:"",
    
})
const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(data)
    setData(data => ({...data,[name]:value}))
}

const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("NAME",data.name)
    formData.append("ADDRESS",data.address)
    formData.append("SHOPOWNER",data.ownername)
    const response= await axios.post(`${url}/api/shop/add`,{NAME:data.name,ADDRESS:data.address,SHOPOWNER:data.ownername})
    console.log(response)
    if (response.data.success){
        toast.success(response.data.message)
    }
    else{
        toast.error("Error")
    }

}
    return (
        <div className='add'>
            <form className = "flex-col" onSubmit={onSubmitHandler}>
                
                <div className = "add-Shop-name flex-col">
                    <p> Shop Name</p>
                    <input onChange={onChangeHandler}  defaultValue={data.name} type= "text" name='name' placeholder = 'Type here'/>
                </div>
                <div className = "add-Shopowner-name flex-col">
                    <p> Shop Owner Name</p>
                    <input onChange={onChangeHandler}  defaultValue={data.ownername} type= "text" name='ownername' placeholder = 'Type here'/>
                </div>
                <div className ="add-Shop-Address flex-col">
                    <p> Shop address</p>
                    <textarea onChange={onChangeHandler} defaultValue={data.address} name='address' rows="6" placeholder='Write address here' required></textarea>

                </div>
                
                <button type= "submit" className='add-button'>Add</button>
            </form>
            
        </div>
    )
}

export default Add