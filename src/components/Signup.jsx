import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from './Input'
import Button from './Button'
import authService from '../appWrite/auth'

function Signup() {

    const [values, setValues] = useState({})
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value
        }))
    }

    const signupHandler = async (e) => {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            const userData = await authService.createAccount({
                email: values.email,
                password: values.password, name: values.name
            })
            if (userData) {
                navigate('/login')
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-auto flex flex-col justify-center items-center bg-slate-700 text-white'>
            <div className='w-auto md:w-[40%] bg-white text-black rounded-md my-4'>
                <div className='mx-2 flex flex-col justify-center items-center'>
                    <h2 className='my-4 font-semibold '>Signup Your Acount</h2>
                    <p>
                        Do you have account
                        <Link to={'/login'} className='text-black underline px-2'>
                            Login
                        </Link>
                    </p>
                </div>
                {error && <p className='text-red-600 m-2 text-center'>{error}</p>}
                <form onSubmit={signupHandler} method='post' className='w-full p-4  '>
                    <Input
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        label="Name: "
                        value={values.name}
                        onChange={(e) => handleChange(e)}
                        className="border w-full text-base px-2 py-2 focus:outline-none focus:border-gray-600"
                    />
                    <Input
                        type="text"
                        placeholder="Enter Email"
                        name="email"
                        label="Email: "
                        value={values.email}
                        onChange={(e) => handleChange(e)}
                        className="border w-full text-base px-4 py-2 focus:outline-none focus:border-gray-600"
                    />
                    <Input
                        type="password"
                        placeholder="Enter Password"
                        nam e="password"
                        label="Password: "
                        value={values.password}
                        onChange={(e) => handleChange(e)}
                        className="border w-full text-base px-4 py-2 focus:outline-none focus:border-gray-600"
                    />
                    {!loading ? (
                        <Button type='submit' className='bg-gray-600 w-full text-center'>
                            Signup
                        </Button>
                    ) : <p>Loading</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default Signup
