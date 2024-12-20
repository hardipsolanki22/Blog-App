import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appWrite/auth'
import { login, logout } from './featured/auth/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const [error , setError] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => {
      setError(error)
    })
    .finally(() => setLoading(false))
  }, [])


  console.log("error: ", error);
  

  return !loading ? (
    <div className='container'>
      <div>
      <Header/>
      TODO: {/* <Outlet/> */}
      <Footer/>
      </div>
    </div>
  ) : <> <h1>Loading</h1> </>;
}

export default App
