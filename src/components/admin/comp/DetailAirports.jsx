import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function DetailAirports() {
    const getToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBiaW5hci5jby5pZCIsInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJBRE1JTiJ9LCJpYXQiOjE2NzE3MTc1MjF9.80QsMAPTPAuD7eyVawX_1VhD1tU-XJSNIkiN2wObOaM";
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
      <div className='container'>
    
      <div class="form-group">
        <label for="exampleInputEmail1">Id Airport</label>
        <input type="text" class="form-control" value={idAirport} placeholder="null" disabled />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input type="text" class="form-control" value={name} placeholder="null" disabled />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">City</label>
        <input type="text" class="form-control" value={city} placeholder="null" disabled />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Country</label>
        <input type="text" class="form-control" value={country} placeholder="null" disabled />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Country_code</label>
        <input type="text" class="form-control" value={country_code} placeholder="null" disabled />
      </div>
    </div>

 
</>

  )
}

export default DetailAirports