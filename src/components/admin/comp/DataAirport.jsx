import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap';
import { Button } from 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faEdit, faTrash, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from 'react-router-dom';

function DataAirport() {

const getToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBiaW5hci5jby5pZCIsInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJBRE1JTiJ9LCJpYXQiOjE2NzE3MTc1MjF9.80QsMAPTPAuD7eyVawX_1VhD1tU-XJSNIkiN2wObOaM";
const [loading, setLoading] = useState(false);
const [airport, setAirport] = useState([]);
const navigate = useNavigate();
const { id } = useParams();

const getRole = localStorage.getItem("role");

useEffect(() => {
  if (getRole === "CUSTOMER"){
    navigate("/")
  }
})


const getAirportData = async () => {
    try{
        const data = await axios.get("https://final-project-be-production-6de7.up.railway.app/api/v1/airports", { headers: {"Authorization" : `Bearer ${getToken}`} });
        console.log(data.data.data);
        setAirport(data.data.data);
        setLoading(true)
    }
    catch (err) {
        console.log(err)
    }
};



const columns = [
    {dataField: "id", text: "ID Airplane", sort: "true", headerStyle: () =>{
        return{ width: "5%"};
    },
},
    {dataField: "name", text: "Name", sort: "true", headerStyle: () =>{
        return{ width: "7%"};
    },},
    {dataField: "city", text: "City", sort: "true"},
    // {dataField: "return_time", text: "Return"},
    {dataField: "country", text: "Country", sort: "true", headerStyle: () =>{
        return{ width: "5%"};
    },},
    {dataField: "country_code", text: "Country_Code", sort: "true", headerStyle: () =>{
        return{ width: "5%"};
    },},
   
    // {dataField: "createdBy", text: "Created By", sort: "true", headerStyle: () =>{
    //     return{ width: "5%"};
    // },},
    // {dataField: "updatedBy", text: "Updated By", sort: "true"},
    // {dataField: "deletedAt", text: "Deleted At", sort: "true"},
    {dataField: "createdAt", text: "Created At", sort: "true"},
    {dataField: "updatedAt", text: "Updated At", sort: "true"},
    {
        dataField: "",
        text: "Action",
        formatter: (rowContent, row) => {
          return (
            <div>
              <Link to={"/admin/detail-airport/" + row.id}>
               <button className="btn btn-dark mb-1"><FontAwesomeIcon icon={faInfo} /> Detail</button>
              </Link>
              
    
              <Link to={"/admin/edit-airport/" + row.id}>
                  <button className="btn btn-dark mb-1"><FontAwesomeIcon icon={faEdit} /> Edit</button>
              </Link>    
             
             
            </div>
          );
        },
      },
];

const defaultSortedBy = [{
    dataField: "id",
    order: "asc" 
}];

useEffect(() => {
    getAirportData();
}, []);

  return (
    <div className="col main pt-5 mt-3">
    <div className="row ">
        <div className="col">
          <h5 className="mt-3 mb-3 text-secondary">
           All Airport
          </h5>
          <div className='container-fluid table-overflow'>
          {loading? (
           <>
           <Link to={"/admin/add-airport"}>
           <button className="btn btn-dark mb-1"><FontAwesomeIcon icon={faPlusCircle} /> Tambah</button>
            </Link>   
            
        <BootstrapTable bootstrap4 style={{fontSize: "20px"}} defaultSorted={defaultSortedBy} keyField='id' data={airport} columns={columns} pagination={paginationFactory()} striped />
        </> 
    ) : (
        <ReactBootstrap.Spinner animation='border' />
    )}
            </div>      
          
        </div>
        
    </div>
    
    
    

</div>
  )
}

export default DataAirport