import React, { useEffect, useState } from "react";
import "./assignorders.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const url = "https://us-central1-e-spazadb.cloudfunctions.net/func";

const Assignorders = () => {
    const [list, setList] = useState([]);
    const [shopList, setShopList] = useState([]);
    const [selectedShops, setSelectedShops] = useState({});

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/order/list`);
            if (response.data.success) {
                const filteredOrders = response.data.data.filter(order => order.SHOPID === '0');
                setList(filteredOrders);
            } else {
                toast.error("Error fetching orders");
            }
        } catch (error) {
            toast.error("Error fetching orders");
        }
    };

    const fetchShops = async () => {
        try {
            const response = await axios.get(`${url}/api/shop/list`); 
            if (response.data.success) {
                
                setShopList(response.data.data);
            } else {
                toast.error("Error fetching shop list");
            }
        } catch (error) {
            toast.error("Error fetching shop list");
        }
    };

    useEffect(() => {
        fetchList();
        fetchShops();
    }, []);

    const statusHandler = async (event, orderId, shopId) => {
        try {
            // const response = await axios.post(`${url}/api/order/assign`, {
            //     orderId,
            //     STATUS: event.target.value,
            //     shopID: shopId 
            // });
            await fetchList();
            // if (response.data.success) {
            //     await fetchList();
                
            // } else {
            //     toast.error("Error updating order status");
            // }
        } catch (error) {
            toast.error("Error updating order status");
        }
    };


    // const handleProductCategoryChange = (event) => {
    //     setProductCategory(event.target.value);
    // };
    const handleShopChange = (event, orderId) => {
        const selectedShopId = event.target.value;
    setSelectedShops(prevState => ({
        ...prevState,
        [orderId]: selectedShopId
    }));
    statusHandler(event, orderId, selectedShopId);
    };

    const handleUpdateAndRemove = async (orderId) => {
        try {
            const selectedShopId = selectedShops[orderId];
            const response = await axios.post(`${url}/api/order/assign`, {
                orderId: orderId,
                SHOPID: selectedShopId
            });
            if (response.data.success) {
                setList(prevList => prevList.filter(order => order._id !== orderId));
                toast.success("Order updated and removed from display");
            } else {
                toast.error("Error updating order");
            }
        } catch (error) {
            toast.error("Error updating order");
        }
    };
    

    return (
        <div className='list add flex-col'>
            <p>Assign Orders</p>
            <div className='list-table'>
                <div className='list-table-format title'>
                    <b>Order Details</b>
                    {/* <b>Status</b> */}
                    <b>Price</b>
                    <b>Assign to:</b>
                </div>
                {list.map((item) => (
                    <div key={item._id} className='list-table-format'>
                        <p>{`${item.ADDRESS.firstName} ${item.ADDRESS.lastName} ${item.ADDRESS.email}`}
                            <p>{`${item.ADDRESS.street} ${item.ADDRESS.city} ${item.ADDRESS.province}`}</p>
                            <p>{`${item.ADDRESS.country} Postal-Code: ${item.ADDRESS.postalcode} 0${item.ADDRESS.phone}`}</p>
                        </p>
                        {/* <select onChange={(event) => statusHandler(event, item._id)} value={item.STATUS}>
                            <option value="Order received">Order Received</option>
                            <option value="Processing Order">Processing Order</option>
                            <option value="Order Shipped">Order Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select> */}
                        <p>R{item.AMOUNT}</p>
                        <p>
                        
                        <select
                            name="spaza"
                            onChange={(event) => handleShopChange(event, item._id)}
                            value={selectedShops[item._id] || ''}
                        >
                            {shopList.map((shop) => (
                                <option key={shop._id} value={shop._id}>
                                    {shop.NAME}
                                </option>
                            ))}
                        </select>
                        </p>
                        <button onClick={() => handleUpdateAndRemove(item._id)}>Assign</button>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Assignorders;
