import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Startup() {
    const navigate = useNavigate()

    useEffect(()=>{
        navigate('/ind/home')
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default Startup
