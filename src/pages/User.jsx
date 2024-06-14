
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom';
const User = () => {

    const [users,setusers]=useState([])
   const {id}= useParams()
    const fetchdata=async()=>{
        const res=await axios.get(`https://66613fd663e6a0189fe90160.mockapi.io/users/${id}`)
        setusers(res.data)
       }
    
        useEffect(()=>{
            fetchdata()
            console.log(users)
        },[])

  return (
    <div className='con'><div className='user'>
      <h1>Name : {users.name}</h1>
      <h2>Email : {users.email}</h2>
      <h2>Street : {users.street}</h2>
      <h2>Phone : {users.phone}</h2>
      <h2>City : {users.city}</h2>
      <h2>Company : {users.company}</h2>
        </div>
        <h3><Link to={"/"}>back to users</Link></h3>
        </div>
  )
}

export default User