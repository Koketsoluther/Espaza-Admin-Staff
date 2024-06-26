import React from 'react'
import { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,} from 'react-icons/bs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label} from 'recharts';
import './dashboard.css'
import axios from "axios"
import {toast} from "react-toastify"

function Home() {
    const url = "https://us-central1-e-spazadb.cloudfunctions.net/func"
    const [list,setList] = useState([]);
    const [plist,setpList] = useState([]);
    const [shopData, setShopData] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/shop/list`);
            if (response.data.success) {
                setList(response.data.data);
                return response.data.data; // Return the data
            } else {
                toast.error('Error fetching the shop list');
                return [];
            }
        } catch (error) {
            toast.error('Error fetching the shop list');
            return [];
        }
    };

    const fetchpList = async () => {
      try {
          const response = await axios.get(`${url}/api/products/list`);
          if (response.data.success) {
              setpList(response.data.data);
              return response.data.data; // Return the data
          } else {
              toast.error('Error fetching the product list');
              return [];
          }
      } catch (error) {
          toast.error('Error fetching the product list');
          return [];
      }
  };

    // const getOrderList = async (shopId) => {
    //     try {
    //       const response = await axios.get(`${url}/api/order/shopOrders`, {SHOPID: shopId});
    //       if (response.data.success) {
    //         console.log(response.data.data);
    //         return response.data.data;
            
    //       } else {
    //         toast.error('Error fetching orders list');
    //         return [];
    //       }
    //     } catch (error) {
    //       toast.error('Error fetching orders list');
    //       return [];
    //     }
    //   };

      const getStaffList = async (shopId) => {
        try {
          const response = await axios.post(`${url}/api/shop/shopstaff`, { SHOP: shopId });
          if (response.data.success) {
            console.log(response.data.data);
            return response.data.data;
          } else {
            toast.error('Error fetching staff list');
            return [];
          }
        } catch (error) {
          toast.error('Error fetching staff list');
          return [];
        }
      };

    //   const shopOrders = async (req,res) =>{
    //     try {
    //         const orders = await orderModel.find({SHOPID: req.body.shopId})
    //         res.json({success: true, data: orders})
    
    //     } catch (error) {
    //         console.log(error)
    //         res.json({success:false, message: "Error"})
    //     }
    // }

      useEffect(() => {
        const fetchData = async () => {
            const shops = await fetchList();
            const dataPromises = shops.map(async (shop) => {
                //const orders = await getOrderList(shop._id);
                //const orders = await shopOrders(shop._id);
                const staff = await getStaffList(shop._id);
                return {
                    name: shop.NAME,
                    staff: staff.length,
                    orders: shop.NoORDERS
                };
            });
            const data = await Promise.all(dataPromises);
            setShopData(data);
           
        };
        fetchData();
        fetchpList();
    }, []);

    //const items = await fetchList();
   // const orders = await getOrderList(shop._id);
    //const staff = await getStaffList(shop._id);
    // const data = [
         
    //     {
    //       name: 'Spaza 1',
    //       staff: 10,
    //       orders: 24,
          
    //     },
    //     {
    //       name: 'Spaza 2',
    //       staff: 5,
    //       orders: 10,
          
    //     },
    //     {
    //       name: 'Spaza 3',
    //       staff: 10,
    //       orders: 2,
          
    //     }
        
    //   ];
return (
    
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    
                    <h3>PRODUCTS</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>{plist.length}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Shops</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>{list.length}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Orders </h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>33</h1>
            </div>
            
        </div>
        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={shopData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                <Label value="Shop Names" offset={-5} position="insideBottom" />
                </XAxis>
                <YAxis>
                <Label value="Number of Orders" angle={-90} position="insideLeft" />
                </YAxis>
                <Tooltip />
                <Legend />
                
                <Bar dataKey="orders" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={shopData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" >
                <Label value="Shop Names" offset={-5} position="insideBottom" />
                </XAxis>
                <YAxis>
                <Label value="Number of Staff" angle={-90} position="insideLeft" />
                </YAxis>
                <Tooltip />
                <Legend />
                <Bar dataKey="staff" fill="#8884d8" />
                
                </BarChart>
            </ResponsiveContainer>

            {/* <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={shopData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="staff" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer> */}

            </div>
        </main>
  )
}

export default Home