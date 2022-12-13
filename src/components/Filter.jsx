import React, { useEffect } from 'react'
import FilterTicket from './filter/filterTicket'






const token = localStorage.getItem('token')




function Filter() {
  return (
    <>
    <FilterTicket />
   
    </>
  )
}

export default Filter