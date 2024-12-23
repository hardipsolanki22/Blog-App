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
            const session = await authService.login({ email: values.email, password: values.password })
            console.log(`session: ${JSON.stringify(session)}`);

            if (session) {
                const userData = await authService.getCurrentUser()
                console.log(`userData: ${JSON.stringify(userData)}`);
                if (userData) {
                    dispatch(login({ userData }))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        } 
    }


    return (
        <div className='w-auto flex flex-col justify-center items-center '>
            <div className='w-auto md:max-w-lg bg-white  text-black rounded-xl my-4 p-4 md:p-10'>
                <div className='flex flex-col justify-center items-center mx-4'>
                    <h2 className='font-semibold my-4'>Login Your Acount</h2>
                    <p>
                        Do you have no account
                        <Link to={'/signup'} className='text-black underline px-2'>
                            Signup
                        </Link>
                    </p>
                </div>
                {error && <p className='text-red-600 m-2 text-center'>{error}</p>}
                <form onSubmit={loginHandler} className='w-full md:p-4 '>
                    <Input
                        type="text"
                        placeholder="Enter Email"
                        name="email"
                        label="Email: "
                        value={values.email}
                        onChange={(e) => handleChange(e)}
                        className="border w-full text-base px-2 py-2 focus:outline-none focus:border-gray-600"

                    />
                    <Input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        label="password: "
                        value={values.password}
                        onChange={(e) => handleChange(e)}
                        className="border w-full text-base px-2 py-2 focus:outline-none focus:border-gray-600"
                    />
                        <Button type='submit' className='bg-gray-500 w-full text-center'>
                            Login
                        </Button>
                </form>
            </div>

        </div>
    )
}

export default Login
