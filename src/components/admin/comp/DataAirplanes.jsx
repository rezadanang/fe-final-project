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
import moment from "moment";

function DataAirplanes() {

const getToken = localStorage.getItem("token");
const [loading, setLoading] = useState(false);
const [airplane, setAirplane] = useState([]);
const navigate = useNavigate();
const { id } = useParams();

const getRole = localStorage.getItem("role");

useEffect(() => {
  if (getRole === "CUSTOMER"){
    navigate("/")
  }
})

const getAirplaneData = async () => {
    try{
        const data = await axios.get("https://final-project-be-production-6de7.up.railway.app/api/v1/airplanes", { headers: {"Authorization" : `Bearer ${getToken}`} });
       
        setAirplane(data.data.data);
        setLoading(true)
    }
    catch (err) {
        console.log(err)
    }
};

function dateFormat(value, row, index) {
    return moment(value).format('HH:mm DD-MM-YYYY');
 }


const columns = [
    {dataField: "id", text: "ID Airplane", sort: "true", headerStyle: () =>{
        return{ width: "5%"};
    },
},
    {dataField: "name", text: "Name", sort: "true", headerStyle: () =>{
        return{ width: "10%"};
    },},
    {dataField: "code", text: "Code", sort: "true"},
    // {dataField: "return_time", text: "Return"},
    {dataField: "country", text: "Country", sort: "true", headerStyle: () =>{
        return{ width: "10%"};
    },},
   
    // {dataField: "createdBy", text: "Created By", sort: "true", headerStyle: () =>{
    //     return{ width: "5%"};
    // },},
    // {dataField: "updatedBy", text: "Updated By", sort: "true"},
    // {dataField: "deletedAt", text: "Deleted At", sort: "true"},
    {dataField: "createdAt", formatter: dateFormat, dateFormat, text: "Created At", sort: "true"},
    {dataField: "updatedAt", formatter: dateFormat, dateFormat, text: "Updated At", sort: "true"},
    {
        dataField: "",
        text: "Action",
        formatter: (rowContent, row) => {
          return (
            <div>
              <Link to={"/admin/detail-airplane/" + row.id}>
               <button className="btn btn-dark mb-1"><FontAwesomeIcon icon={faInfo} /> Detail</button>
              </Link>
              
    
              <Link to={"/admin/edit-airplane/" + row.id}>
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
    getAirplaneData();
}, []);

  return (
    <div className="col main pt-5 mt-3">
    <div className="row ">
        <div className="col">
          <h5 className="mt-3 mb-3 text-secondary">
           All Airplanes
          </h5>
          <div className='container-fluid table-overflow'>
          {loading? (
           <>
           <Link to={"/admin/add-airplane"}>
           <button className="btn btn-dark mb-1"><FontAwesomeIcon icon={faPlusCircle} /> Add Airplane</button>
            </Link>   
            
        <BootstrapTable bootstrap4 style={{fontSize: "20px"}} defaultSorted={defaultSortedBy} keyField='id' data={airplane} columns={columns} pagination={paginationFactory()} striped />
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

export default DataAirplanes