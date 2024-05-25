import React, {useState, useEffect} from 'react'
import './listproduct.css'
import axios from "axios"
import {toast} from "react-toastify"

const List = () => {
    const url = "https://us-central1-e-spazadb.cloudfunctions.net/func"
    const [list,setList] = useState([]);

    const fetchList =async () => {
        const response =await axios.get(`${url}/api/products/list`);

        if(response.data.success){
            setList(response.data.data)
        }
        else{
            toast.error("error")
        }
    }

    const removeProduct = async(ProductID) => {
        const response = await axios.post(`${url}/api/products/remove`,{id:ProductID});
        await fetchList();
        if (response.data.success){
            toast.success(response.data.message)
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
            <p>All product list</p>
            <div className='list-table'>
                <div className = "list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item,index)=>{
                    return (
                       <div key={index} className='list-table-format'>
                            <img src={`${url}/images/`+item.IMAGE} alt = "" />
                            <p>{item.NAME}</p>
                            <p>{item.CATEGORY}</p>
                            <p>R{item.PRICE}</p>
                            <p onClick={()=>removeProduct(item._id)} className='cursor'>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List