import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'
import authService from '../appWrite/auth'
import { useDispatch } from 'react-redux'
import { login } from '../featured/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({})

    const handleChange = (e) => {
        setValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value
        }))
    }

    console.log(`values : ${JSON.stringify(values)}`);
    console.log(`error : ${JSON.stringify(error)}`);
    

    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            const session = await authService.login({email: values.email, password: values.password})
            console.log(`session: ${JSON.stringify(session)}`);
            
            if (session) {
                const userData = await authService.getCurrentUser()
                console.log(`userData: ${JSON.stringify(userData)}`);
                if (userData) {
                    dispatch(login({userData}))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }


    }


    return (
        <div className='w-full bg-slate-600'>
            <div>
                <h2 className='text-white font-semibold'>Login Your Acount</h2>
                <p>
                    Do you have no account
                    <Link to={'/signup'}>
                        Signup
                    </Link>
                </p>
            </div>
            {error && <p>{error}</p>}
            <form onSubmit={loginHandler}>
                <Input
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    label="Email: "
                    value={values.email}
                    onChange={(e) => handleChange(e)}

                />
                <Input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    label="password: "
                    value={values.password}
                    onChange={(e) => handleChange(e)}
                />
                {!loading ? (
                    <Button type='submit'>
                        Login
                    </Button>
                ) : <p>Loading</p>
                }
            </form>

        </div>
    )
}

export default Login
