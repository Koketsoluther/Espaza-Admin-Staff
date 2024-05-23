import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { useAuth0 } from "@auth0/auth0-react";
import UserProfile from '../UserProfile';
const Navbar = () => {
    return (
        <div className = 'navbar'>
            <h1>E-spaza Admin </h1>
            <img className= 'profile' src = {assets.profile_icon} alt = ""/>
            <UserProfile/>

        </div>
    )
}

export default Navbar