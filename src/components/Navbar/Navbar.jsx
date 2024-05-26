import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import UserProfile from '../UserProfile';
import LoginButton from "../LoginForm/LoginButton";
import LogoutButton from '../LoginForm/LogoutButton';
const Navbar = () => {
    return (
        <div className = 'navbar'>
            <h1>E-spaza Admin </h1>
            
            <LoginButton/>
            <UserProfile/>
            <LogoutButton/>
        </div>
    )
}

export default Navbar