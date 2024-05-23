import React from 'react'

import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import Addproduct from './pages/Addproduct/addproduct'
import Addstaff from './pages/Addstaff/addstaff'
import Addshop from './pages/Addshop/adddshop'
import Listproduct from './pages/ListProduct/listproduct'
import Managestock from './pages/Managestock/managestock'
import Shops from './pages/listShops/shops'
import Dashboard from './pages/Dashboard/dashboard'
import ListOrders from './pages/listOrders/listorders'
import AssignOrders from './pages/assignorders/assignorders'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css';
import ListStaff from './pages/listStaff/liststaff'

const App = () =>{
  return(
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className='app-content'>
        <Sidebar userRole='admin'/>
        <Routes>
        <Route path= "/" element = {<Dashboard/>}/>
          <Route path= "/addproduct" element = {<Addproduct/>}/>
          <Route path= "/addstaff" element = {<Addstaff/>}/>
          <Route path= "/addshop" element = {<Addshop/>}/>
          <Route path= "/shops" element = {<Shops/>}/>
          <Route path= "/ListProduct" element = {<Listproduct/>}/>
          <Route path= "/Managestock" element = {<Managestock/>}/>
          <Route path='/liststaff' element={<ListStaff/>}/>
          <Route path= "/listorders" element = {<ListOrders/>}/>
          <Route path= "/assignOrders" element = {<AssignOrders/>}/>
        </Routes>
      </div>
    </div>
  )
}
export default App