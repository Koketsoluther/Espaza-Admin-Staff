import React from 'react';
//import { Routes, Route, useNavigate } from 'react-router-dom';
//import Admin from './admin/src/App.jsx';
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
    const { user, isAuthenticated } = useAuth0();
    console.log(user['https://my-app.example.com/roles']);
    // Check if user and roles exist
    /*const navigate = useNavigate(); // Access navigate function from react-router-dom

    useEffect(() => {
        // Redirect to home or another route if userRole is not 'admin'
        if (!isAuthenticated || (userRole !== 'admin')) {
            navigate('/'); // Redirect to home route
        }
    }, [isAuthenticated, navigate, userRole]);

    if (!isAuthenticated || (userRole !== 'admin')) {
        return null; // Render nothing if redirection is in progress
    }*/

    return (
        isAuthenticated &&(

           
            <article className="column">
                <p>{user['https://my-app.example.com/roles']}</p>
            </article>
        
        )
    );

}

export default UserProfile;
