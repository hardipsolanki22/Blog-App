import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appWrite/auth'
import { logout } from '../../featured/auth/authSlice'
import { useNavigate } from 'react-router-dom'


function LogoutBtn() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    const userLogout = await authService.logout()
    if (userLogout) {
      dispatch(logout())
    }

  }
  return (
    <>
      <button onClick={logoutHandler}>
        Logout
      </button>
    </>
  )
}

export default LogoutBtn
