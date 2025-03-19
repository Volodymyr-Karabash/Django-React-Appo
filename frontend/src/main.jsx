import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer, toast} from 'react-toastify';
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import OTPProvider from './context/OTPProvider.jsx'
import DataPassProvider from './context/DataPassProvider.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <OTPProvider>
      <DataPassProvider>
        <App /> 
        <ToastContainer />
      </DataPassProvider>
    </OTPProvider>
  </Provider>,
)
