import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AddAirports() {
    const getToken = localStorage.getItem("token");
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [values, setValues] = useState({
        name: "",
        city: "",
        country: "",
        country_code: ""
        
    })

    const getRole = localStorage.getItem("role");

    useEffect(() => {
      if (getRole === "CUSTOMER"){
        navigate("/")
      }
    })

    const handleSubmitAirport = async (e) => {
        e.preventDefault();
        try{
            await axios.post('https://final-project-be-production-6de7.up.railway.app/api/v1/airports/add', {
                name: values.name,
                city: values.city,
                country: values.country,
                country_code: values.country_code
            },
            {
            headers: {
              Authorization: 'Bearer ' + getToken
            }
          })
          toast.success('Success added airport', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
          setTimeout(() => {
            navigate("/admin/airport")
          }, 3000);
          }
          
          catch (err) {
              console.log(err)
          }
    }
  return (
    <>
    <h4 className='text-center mt-4'>Add Airport</h4>
      <div className='container' style={{backgroundColor:"#4600FF", borderRadius:"20px"}}>
      <div className='container p-5'>
      <form onSubmit={handleSubmitAirport}>
      <div className='row'>
          <div className='col lg-6'>
            <div class="form-group">
              <label style={{color:"white"}}>Name</label>
              <input type="text" class="form-control" id='name' placeholder="Name" onChange={(e)=>setValues({...values,name:e.target.value})} required />
            </div>
          </div>
          <div className='col lg-6'>
            <div class="form-group">
              <label style={{color:"white"}}>City</label>
              <input type="text" class="form-control" id='city' placeholder="City" onChange={(e)=>setValues({...values,city:e.target.value})} required />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col lg-6'>
            <div class="form-group">
              <label style={{color:"white"}}>Country</label>
              <input type="text" class="form-control" id='country' placeholder="Country" onChange={(e)=>setValues({...values,country:e.target.value})} required />
            </div>
          </div>
          <div className='col lg-6'>
            <div class="form-group">
              <label style={{color:"white"}}>Country Code</label>
              <input type="text" class="form-control" id='country_code' placeholder="Country Code" onChange={(e)=>setValues({...values,country_code:e.target.value})} required />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col lg-6'>
            
          </div>
          <div className='col lg-6'>
            <div className="field mt-4">
             <button type="submit" className="btn btn-warning" ><FontAwesomeIcon icon={faCirclePlus} /> Add AirPort
            </button>
           </div>
          </div>
        </div>
      </form>
    </div>
    </div>
    <ToastContainer />
    </>
  )
}

export default AddAirports