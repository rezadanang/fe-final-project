import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function AddAirplanes() {
    const getToken = localStorage.getItem("token");
    const navigate = useNavigate();

    const getRole = localStorage.getItem("role");

  useEffect(() => {
    if (getRole === "CUSTOMER"){
      navigate("/")
    }
  })
    const [validated, setValidated] = useState(false);
    const [values, setValues] = useState({
        name: "",
        code: "",
        country: ""
        
    })

    const handleSubmitAirplanes = async (e) => {
        e.preventDefault();
        try{
            await axios.post('https://final-project-be-production-6de7.up.railway.app/api/v1/airplanes/add', {
                name: values.name,
                code: values.code,
                country: values.country
            },
            {
            headers: {
              Authorization: 'Bearer ' + getToken
            }
          })
          toast.success('Success added airplane', {
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
            navigate("/admin/airplane")
          }, 3000);
          }
          
          catch (err) {
              console.log(err)
          }
    }
  return (
    <>
      <h4 className='text-center mt-4'>Add Airplane</h4>
       <div className='container' style={{backgroundColor:"#4600FF", borderRadius:"20px"}}>
      <div className='container p-5'>
      <form onSubmit={handleSubmitAirplanes}>
      <div className='row'>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Name</label>
              <input type="text" class="form-control" id='name' placeholder="Name" onChange={(e)=>setValues({...values,name:e.target.value})} required />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Code</label>
              <input type="text" class="form-control" id='code' placeholder="Code" onChange={(e)=>setValues({...values,code:e.target.value})} required />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Country</label>
              <input type="text" class="form-control" id='country' placeholder="Country" onChange={(e)=>setValues({...values,country:e.target.value})} required />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col lg-4 md-4 xs-12'>
           
          </div>
          <div className='col lg-4 md-4 xs-12'>
            
          </div>
          <div className='col lg-4 md-4 xs-12'>
          <div className="field mt-3">
             <button type="submit" className="btn btn-warning" ><FontAwesomeIcon icon={faPlusCircle} /> Add AirPlane
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

export default AddAirplanes