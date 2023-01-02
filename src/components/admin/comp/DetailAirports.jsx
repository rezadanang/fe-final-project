import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function DetailAirports() {
  const getToken = localStorage.getItem("token");
    const [idAirport, setIdAirport] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [country_code, setCountry_Code] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getAirportById();
      }, []);

      const getRole = localStorage.getItem("role");

      useEffect(() => {
        if (getRole === "CUSTOMER"){
          navigate("/")
        }
      })


      const getAirportById = async () => {
        const response = await axios.get(`https://final-project-be-production-6de7.up.railway.app/api/v1/airports/${id}`, { headers: {"Authorization" : `Bearer ${getToken}`} });
        setIdAirport(response.data.data.id);
        setName(response.data.data.name);
        setCity(response.data.data.city)
        setCountry(response.data.data.country)
        setCountry_Code(response.data.data.country_code)
      };
    
  return (
      <>
      <h4 className='text-center mt-4'>Detail Airport</h4>
       <div className='container' style={{backgroundColor:"#4600FF", borderRadius:"20px"}}>
      <div className='container p-5'>
      <div className='row'>
          <div className='col lg-6'>
          <div class="form-group">
              <label style={{color:"white"}}>Id Airport</label>
              <input type="text" class="form-control" value={idAirport} placeholder="null" disabled />
          </div>
          </div>
          <div className='col lg-6'>
            <div class="form-group">
              <label style={{color:"white"}}>Name</label>
              <input type="text" class="form-control" value={name} placeholder="null" disabled />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col lg-6'>
          <div class="form-group">
            <label style={{color:"white"}}>City</label>
            <input type="text" class="form-control" value={city} placeholder="null" disabled />
          </div>
          </div>
          <div className='col lg-6'>
            <div class="form-group">
              <label style={{color:"white"}}>Country</label>
              <input type="text" class="form-control" value={country} placeholder="null" disabled />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col lg-6'>
          <div class="form-group">
              <label style={{color:"white"}}>Country_code</label>
              <input type="text" class="form-control" value={country_code} placeholder="null" disabled />
            </div>
          </div>
          <div className='col lg-6'>
            
          </div>
        </div>
    </div>
    </div>

 
</>

  )
}

export default DetailAirports