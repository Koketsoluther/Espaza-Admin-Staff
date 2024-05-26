import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';
import './LoginButton.css'
const LoginButton=()=>{
    const {loginWithRedirect,isAuthenticated}=useAuth0();
    return(
        !isAuthenticated &&(
            <button data-testid="signinTest"  className="secondary-button" onClick={()=> loginWithRedirect()}>
                Sign In
            </button>
        )
     
    )
}
export default LoginButton