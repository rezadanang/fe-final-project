import React from 'react'
import img404 from '../assets/404-img.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NotFound() {

  return (
    <>
    <div>
      <div className='mt-5'>
        <h1 className="text-center">ERROR NOT FOUND</h1>
      </div>
      <div className="text-center">
        <img src={img404} style={{width:"500px"}} />
      </div>
      </div>
     </>
  )
}

export default NotFound