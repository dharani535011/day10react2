import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaLaughBeam } from "react-icons/fa";
import { Link } from 'react-router-dom';
 
const Users = () => {
    const [users,setusers]=useState([])
    const [values,setvalues]=useState({
        name: '',
        email: '',
        street: '',
        phone: '',
        city: '',
        company: ''
    })
    const [add,setadd]=useState(false)
    const [okk,setokk]=useState(false)
    const [ids,setids]=useState("")
   
const fetchdata=async()=>{
    const res=await axios.get("https://66613fd663e6a0189fe90160.mockapi.io/users")
    setusers(res.data)
   }

    useEffect(()=>{
        fetchdata()
        
    },[])
    const handledelete=async(id)=>{
        await axios.delete(`https://66613fd663e6a0189fe90160.mockapi.io/users/${id}`)
        const value=users.filter((val)=>val.id!==id)
        setusers(value)
        fetchdata()
       }
       const handleedit=async(id)=>{
        setadd(true)
        setokk(true)
        setids(id)
       const value= await axios.get(`https://66613fd663e6a0189fe90160.mockapi.io/users/${id}`)
        const user=value.data
        setvalues({
            name: user.name,
            email: user.email,
            street: user.street,
            phone: user.phone,
            city: user.city,
            company: user.company
        });

       }
      const handleadd=()=>{
setadd(true)
       }
       const handleaddd=async()=>{
        await axios.post("https://66613fd663e6a0189fe90160.mockapi.io/users",values)
        setvalues({
            name: '',
            email: '',
            street: '',
            phone: '',
            city: '',
            company: ''
        });
        setadd(false)
        fetchdata()
               }
       const handlecancel=()=>{
        setadd(false)
        setokk(false)
        setvalues({
            name: '',
            email: '',
            street: '',
            phone: '',
            city: '',
            company: ''
        });
               }
       const handlechange=(e)=>{
              const {value,name}=e.target
            setvalues((pre)=>({
                ...pre,[name]:value
            }))
       } 
       const handleokk=async()=>{
          await axios.put(`https://66613fd663e6a0189fe90160.mockapi.io/users/${ids}`,values)
          setadd(false)
          setokk(false)
          setvalues({
            name: '',
            email: '',
            street: '',
            phone: '',
            city: '',
            company: ''
        })
        fetchdata()
        }

  return (
    <>
    <div className='popup' style={{display:add?"block":"none"}}></div>
    <div className='open' style={{display:add?"block":"none"}}>
    <div className='popup-box'>
        <input type="text" placeholder='Name..' name='name' value={values.name} onChange={(e)=>handlechange(e)}/>
        <input type="email" placeholder='Email..' name='email' value={values.email} onChange={(e)=>handlechange(e)}/>
        <input type="text" placeholder='Street..' name='street' value={values.street} onChange={(e)=>handlechange(e)}/>
        <input type="phone" placeholder='Phone..' name='phone' value={values.phone} onChange={(e)=>handlechange(e)}/>
        <input type="text" placeholder='City..' name='city' value={values.city} onChange={(e)=>handlechange(e)}/>
        <input type="text" placeholder='Company..' name='company' value={values.company} onChange={(e)=>handlechange(e)}/>
        {okk?(<button onClick={()=>handleokk()}>Okk</button>):(<button onClick={()=>handleaddd()}>Add</button>)}
        <button  onClick={()=>handlecancel()}>Cancel</button>
    </div>
    </div>
    <h1>Users :{users.length?users.length:"No users available, add new users =>"}</h1>
    <div className='users'>{users.map((val)=>(
        <div className='box' key={val.id}><h2><FaLaughBeam /></h2><h2><Link className='kkk' to={`/user/${val.id}`}>{val.name}</Link></h2><button onClick={()=>handleedit(val.id)}>Edit</button><button onClick={()=>handledelete(val.id)}>Delete</button></div>
    ))}</div>
    <button id='add' onClick={()=>handleadd()}>+</button>
    </>
  )
}

export default Users