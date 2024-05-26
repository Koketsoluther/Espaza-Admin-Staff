import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import {BrowserRouter} from 'react-router-dom'
const domain='dev-8ao6bgrymlzjni6w.us.auth0.com';
const clientId='Z8R7nmU8IkNttNvD3nZK3WKtWdINm8R0';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
          <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
            redirect_uri: window.location.origin}}>
            <App/>
        </Auth0Provider>
    
  </BrowserRouter>
)