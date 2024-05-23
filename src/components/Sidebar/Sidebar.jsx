import React from 'react'
import{ useState } from 'react'
import './Sidebar.css'
// import {assets} from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import {BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsPeopleFill, BsListCheck} from 'react-icons/bs'


const Sidebar = () => {

    const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

    const toggleProductsDropdown = () => {
      setIsProductsDropdownOpen(!isProductsDropdownOpen);
    };

    const [isShopsDropdownOpen, setIsShopsDropdownOpen] = useState(false);

    const toggleShopsDropdown = () => {
      setIsShopsDropdownOpen(!isShopsDropdownOpen);
    };

    const [isOrdersDropdownOpen, setIsOrdersDropdownOpen] = useState(false);

    const toggleOrdersDropdown = () => {
      setIsOrdersDropdownOpen(!isOrdersDropdownOpen);
    };


    return (
        <div className = 'sidebar'>
            <div className = "sidebar-options">
            <NavLink to= '/' className= "sidebar-option">
                    <p><BsGrid1X2Fill className='icon'/> Dashboard</p>
                </NavLink>
            <div className='sidebar-option' onClick={toggleProductsDropdown}>
                <p><BsFillArchiveFill className='icon'/> Products</p>
                {isProductsDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
        {isProductsDropdownOpen && (
          <div className='dropdown-menu'>
            <NavLink to='/ListProduct' className='dropdown-item'>
              <p>List Products</p>
            </NavLink>
            <NavLink to='/Addproduct' className='dropdown-item'>
              <p>Add Products</p>
            </NavLink>
          </div>
        )}
<div className='sidebar-option' onClick={toggleShopsDropdown}>
                <p><BsCart3  className='icon_header'/>Shops</p>
                {isShopsDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
        {isShopsDropdownOpen && (
          <div className='dropdown-menu'>
            <NavLink to= '/Addshop' className= "dropdown-item">
                    <p>Add Shops</p>
            </NavLink>
            <NavLink to='/shops' className='dropdown-item'>
              <p>View all shops</p>
            </NavLink>
          </div>
        )}
                
                <div className='sidebar-option' onClick={toggleOrdersDropdown}>
                <p> Orders</p>
                {isOrdersDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
        {isOrdersDropdownOpen && (
          <div className='dropdown-menu'>
            <NavLink to='/assignorders' className='dropdown-item'>
              <p>Assign Orders</p>
            </NavLink>
            <NavLink to='/listorders' className='dropdown-item'>
              <p>Orders</p>
            </NavLink>
          </div>
        )}       

                <NavLink to= '/Addstaff' className= "sidebar-option">
                    <p><BsPeopleFill className='icon'/>Add Staff</p>
                    </NavLink>
                <NavLink to= '/Managestock' className= "sidebar-option">
                    <p><BsListCheck className='icon'/>Manage stock</p>
                </NavLink>

            </div>

        </div>
    )
}
export default Sidebar