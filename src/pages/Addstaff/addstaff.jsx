import React, { useState } from 'react'
// import { useAuth0 } from "@auth0/auth0-react";
import './addstaff.css'
import axios from 'axios'
import {toast} from "react-toastify"
import '../listStaff/liststaff'
import {Link} from "react-router-dom";

const Add = () => {
const url = "https://thankful-hill-0b5ec3803-27.westeurope.5.azurestaticapps.net/"
// const [productCategory,setProductCategory]= useState('');


const [data,setData] = useState({
    NAME: "",
    SURNAME:"",
    SHOP:"",
    ID: "",
    EMAIL:"",
    PERMISSION: "Staff"
    
})
const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data,[name]:value}))
}

const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("NAME",data.NAME)
    formData.append("SURNAME",data.SURNAME)
    formData.append("SHOPID",data.SHOP)
    formData.append("ID",data.ID)
    formData.append("EMAIL",data.EMAIL)
    formData.append("PERMISSION",data.PERMISSION)
    console.log(data)
    const response= await axios.post(`${url}/api/staff/register`,{NAME:data.NAME, SURNAME:data.SURNAME,SHOP:data.SHOP,ID:data.ID,EMAIL:data.EMAIL})
    console.log(response)
    if (response.data.success){
        toast.success(response.data.message)
    }
    else{
        toast.error("Error")
    }
}

// const handleProductCategoryChange=(event)=>{
//     setProductCategory(event.target.value.item);
// };
// const {loginWithRedirect}=useAuth0();
    return (



 


        <div className='add'>
            <form className = "flex-col" onSubmit={onSubmitHandler}>
                
                <div className = "add-Staff-first-name flex-col">
                    <p>Staff Firstname</p>
                    <input onChange={onChangeHandler}  value={data.NAME} type= "text" name='NAME' placeholder = 'John'/>
                </div>
                <div className = "add-Shopowner-name flex-col">
                    <p>Staff Surname</p>
                    <input onChange={onChangeHandler}  value={data.SURNAME} type= "text" name='SURNAME' placeholder = 'Dore'/>
                </div>
                <div className = "add-Shopowner-name flex-col">
                    <p>Staff Email</p>
                    <input onChange={onChangeHandler}  value={data.EMAIL} type= "email" name='EMAIL' placeholder = 'john.dore@staff.com'/>
                </div>
                <div className = "add-Shop-name flex-col">
                    <p>Shop name</p>
                    <select  name="SHOP" onChange={onChangeHandler} value={data.SHOP}  >
                            <option value= "Spaza 1">Spaza 1</option>
                            <option value= "Spaza 2">Spaza 2</option>
                            <option value= "Spaza 3">Spaza 3</option>
                            <option value= "Spaza 4">Spaza 4</option>
                          
                        </select>
                </div>
                <div className = "add-staffIDnumber flex-col">
                    <p>Staff ID number</p>
                    <input onChange={onChangeHandler}  value={data.ID} type= "text" name='ID' placeholder = 'STAFF123' required/>
                </div>
                {/* <div className = "add-staffpassword flex-col">
                    <p>Default Staff password</p>
                    <input onChange={onChangeHandler}  value={data.STAFFPASSWORD} type= "text" name='STAFFPASSWORD' placeholder = 'Type here'/>
                </div> */}
                {/* <div className='add-staffpermission flex col'>
                        <p>Choose Staff Permission</p>
                        <select name="PERMISSION" onChange={onChangeHandler}  >
                            <option value= {data.PERMISSION}>Admin</option>
                            <option value= {data.PERMISSION}>Staff Member</option>
                        </select>
                    </div> */}
                    {/* !isAuthenticated &&(<button type= "submit" className='add-button' onClick={()=> loginWithRedirect()}>Add</button>) */}
        {/* !isAuthenticated &&( */}
        
            <button data-testid="submit" className="add-button">
        Add
            </button>
    
            </form>
            <button>
                 <Link to="/listStaff" className='list-button'>Show Staff Members</Link>
            </button>
            
             {/* onClick={() => loginWithRedirect()} */}
            
        </div>
    )
}
// className="signin" onClick={handleClick} onChange={handleChange}>

export default Add