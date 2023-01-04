import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../../Login';

function EditAirplanes() {
    const getToken = localStorage.getItem("token");

    const [idAirplanes, setIdAirplanes] = useState("");
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [country, setCountry] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    const getRole = localStorage.getItem("role");

  useEffect(() => {
    if (getRole === "CUSTOMER"){
      navigate("/")
    }
  })

    useEffect(() => {
        getAirplanesById();
      }, []);

      const updateAirplanes = async (e) => {
        e.preventDefault();
        try{
          await axios.put(`https://final-project-be-production-6de7.up.railway.app/api/v1/airplanes/update/${id}`, {
            name : name,
            code: code,
            country: country
          },
          {
          headers: {
            Authorization: 'Bearer ' + getToken
          }
        })
        toast.success('Success updated airplane', {
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
            console.log(err.message)
        }
    };

    const deleteAirplanes = async (e) => {
      e.preventDefault();
      try{
        await axios.delete(`https://final-project-be-production-6de7.up.railway.app/api/v1/airplanes/delete/${id}`,{ headers: {"Authorization" : `Bearer ${getToken}`} });
        toast.success('Success deleted airplane', {
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
  };
  

  

      const getAirplanesById = async () => {
        try{const response = await axios.get(`https://final-project-be-production-6de7.up.railway.app/api/v1/airplanes/${id}`, { headers: {"Authorization" : `Bearer ${getToken}`} });
        setIdAirplanes(response.data.data.id);
        setName(response.data.data.name);
        setCode(response.data.data.code)
        setCountry(response.data.data.country)
      }catch (err){
        console.log(err);
      }
        
      };
    
      if (getToken) {
        return (
    <>
    <h4 className='text-center mt-4'>Edit Airplane</h4>
    <div className='container' style={{backgroundColor:"#4600FF", borderRadius:"20px"}}>
    <div className='container p-5'>
      <form onSubmit={updateAirplanes}>
      <div className='row'>
          <div className='col lg-6'>
            <div class="form-group">
              <label style={{color:"white"}}>Id Airplanes</label>
              <input type="text" class="form-control" value={idAirplanes} placeholder="null" onChange={(e) => setIdAirplanes(e.target.value)} disabled />
            </div>
          </div>
          <div className='col lg-6'>
            <div class="form-group">
              <label style={{color:"white"}}>Name Airplane</label>
              <input type="text" class="form-control" value={name} placeholder="null" onChange={(e) => setName(e.target.value)} disabled/>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col lg-6'>
            <div class="form-group">
              <label style={{color:"white"}}>Code</label>
              <input type="text" class="form-control" value={code} placeholder="null" onChange={(e) => setCode(e.target.value)} />
            </div>
          </div>
          <div className='col lg-6'>
            <div class="form-group">
              <label style={{color:"white"}}>Country</label>
              <input type="text" class="form-control" value={country} placeholder="null" onChange={(e) => setCountry(e.target.value)} />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col lg-6'>
            <div className="field mt-4">
             <button type="submit" className="btn btn-warning" ><FontAwesomeIcon icon={faEdit} />
              Update
            </button>
           </div>
          </div>
          <div className='col lg-6'>
            <div className="field mt-4">
              <button className="btn btn-danger" onClick={deleteAirplanes}><FontAwesomeIcon icon={faTrash} /> Delete</button>
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
else { 
  return (
    <Login />
  )
}
}
export default EditAirplanes