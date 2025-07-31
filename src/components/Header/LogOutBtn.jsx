import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogOutBtn() {
const dispatch=useDispatch()

const handleLougout=()=>{
    authservice.logOut().then(
        ()=>{dispatch(logout())}
    )
}

    return (
        <button onClick={()=>{handleLougout}} className='inline-block px-6 py-2 duration-200
        hover:bg-blue-500 rounded-full
        ' >logout</button>
    )
}

export default LogOutBtn
