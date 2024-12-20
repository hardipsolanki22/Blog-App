import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)

    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } else if(!authentication && authStatus !== authentication) {
            navigate('/login')
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return !loader ? <>{children}</> : <h2>Loading</h2>
}

export default Protected
