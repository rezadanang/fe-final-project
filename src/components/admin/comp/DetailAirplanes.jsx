import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function DetailAirplanes() {
    const getToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBiaW5hci5jby5pZCIsInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJBRE1JTiJ9LCJpYXQiOjE2NzE3MTc1MjF9.80QsMAPTPAuD7eyVawX_1VhD1tU-XJSNIkiN2wObOaM";
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
    
  return (
      <>
      <div className='container'>
    
      <div class="form-group">
        <label for="exampleInputEmail1">Id Airplane</label>
        <input type="text" class="form-control" value={idAirplanes} placeholder="null" disabled />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input type="text" class="form-control" value={name} placeholder="null" disabled />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Code</label>
        <input type="text" class="form-control" value={code} placeholder="null" disabled />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Country</label>
        <input type="text" class="form-control" value={country} placeholder="null" disabled />
      </div>
    </div>

 
</>

  )
}

export default DetailAirplanes