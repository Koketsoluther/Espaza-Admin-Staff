import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
const Navbar = () => {
    return (
        <div className = 'navbar'>
            <h1>E-spaza Admin </h1>
            <img className= 'profile' src = {assets.profile_icon} alt = ""/>
        
        </div>
    )
}

export default Navbar