import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditAirports() {
    const getToken = localStorage.getItem("token");

    const [idAirports, setIdAirports] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [country_code, setCountry_Code] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    const getRole = localStorage.getItem("role");

    useEffect(() => {
      if (getRole === "CUSTOMER"){
        navigate("/")
      }
    })

    useEffect(() => {
        getAirportsById();
      }, []);

      const updateAirports = async (e) => {
        e.preventDefault();
        try{
          await axios.put(`https://final-project-be-production-6de7.up.railway.app/api/v1/airports/update/${id}`, {
            name : name,
            city: city,
            country: country,
            country_code: country_code
          },
          {
          headers: {
            Authorization: 'Bearer ' + getToken
          }
        })
        toast.success('Success edited airport', {
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
            console.log(err.message)
        }
    };

    const deleteAirports = async (e) => {
      e.preventDefault();
      try{
        await axios.delete(`https://final-project-be-production-6de7.up.railway.app/api/v1/airports/delete/${id}`,{ headers: {"Authorization" : `Bearer ${getToken}`} });
        toast.success('Success deleted airport', {
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
  };
  

  

      const getAirportsById = async () => {
        try{const response = await axios.get(`https://final-project-be-production-6de7.up.railway.app/api/v1/airports/${id}`, { headers: {"Authorization" : `Bearer ${getToken}`} });
        setIdAirports(response.data.data.id);
        setName(response.data.data.name);
        setCity(response.data.data.city)
        setCountry(response.data.data.country)
        setCountry_Code(response.data.data.country_code)
      }catch (err){
        console.log(err);
      }
        
      };
    
  return (
    <>
    <h4 className='text-center mt-4'>Edit Airport</h4>
    <div className='container' style={{backgroundColor:"#4600FF", borderRadius:"20px"}}>
      <div className='container p-5'>
      <form onSubmit={updateAirports}>
      <div className='row'>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Id Airport</label>
              <input type="text" class="form-control" value={idAirports} placeholder="null" onChange={(e) => setIdAirports(e.target.value)} disabled />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Name Airport</label>
              <input type="text" class="form-control" value={name} placeholder="null" onChange={(e) => setName(e.target.value)}/>
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>City</label>
              <input type="text" class="form-control" value={city} placeholder="null" onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col lg-6'>
            <div class="form-group">
              <label style={{color:"white"}}>Country</label>
              <input type="text" class="form-control" value={country} placeholder="null" onChange={(e) => setCountry(e.target.value)} />
          </div>
          </div>
          <div className='col lg-6'>
            <div class="form-group">
              <label style={{color:"white"}}>Country_Code</label>
              <input type="text" class="form-control" value={country_code} placeholder="null" onChange={(e) => setCountry_Code(e.target.value)} />
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
           <button className="btn btn-danger" onClick={deleteAirports}><FontAwesomeIcon icon={faTrash} /> Delete</button>
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

export default EditAirports