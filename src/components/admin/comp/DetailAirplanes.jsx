import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Login from '../../Login';


function DetailAirplanes() {
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


      const getAirplanesById = async () => {
        const response = await axios.get(`https://final-project-be-production-6de7.up.railway.app/api/v1/airplanes/${id}`, { headers: {"Authorization" : `Bearer ${getToken}`} });
        setIdAirplanes(response.data.data.id);
        setName(response.data.data.name);
        setCode(response.data.data.code)
        setCountry(response.data.data.country)
      };
    
      if (getToken) {
        return (
      <>
      <h4 className='text-center mt-4'>Detail Airplane</h4>
       <div className='container' style={{backgroundColor:"#4600FF", borderRadius:"20px"}}>
      <div className='container p-5'>
      <div className='row'>
          <div className='col lg-6'>
            <div class="form-group">
              <label style={{color:"white"}}>Id Airplane</label>
              <input type="text" class="form-control" value={idAirplanes} placeholder="null" disabled />
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
              <label style={{color:"white"}}>Code</label>
              <input type="text" class="form-control" value={code} placeholder="null" disabled />
            </div>
          </div>
          <div className='col lg-6'>
            <div class="form-group">
              <label style={{color:"white"}}>Country</label>
              <input type="text" class="form-control" value={country} placeholder="null" disabled />
            </div>
          </div>
        </div>
    
      
    
      
    </div>
    </div>
 
</>

  )
}
else { 
  return (
    <Login />
  )
}
}

export default DetailAirplanes