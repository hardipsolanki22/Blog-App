import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from './Input'
import Button from './Button'
import authService  from '../appWrite/auth'

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

    const signupHandler = async(e) => {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            const userData = await authService.createAccount({email: values.email,
                 password: values.password, name: values.name})
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
        <div className='bg-slate-600'>
            <div>
                <h2 className='text-white font-semibold'>Signup Your Acount</h2>
                <p>
                    Do you have account
                    <Link to={'/login'}>
                        Login
                    </Link>
                </p>
            </div>
            {error && <p>{error}</p>}
            <form onSubmit={signupHandler} method='post'>
                <Input
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    label="Name: "
                    value={values.name}
                    onChange={(e) => handleChange(e)}

                />
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
                    label="Password: "
                    value={values.password}
                    onChange={(e) => handleChange(e)}
                />
                {!loading ? (
                    <Button>
                        Signup
                    </Button>
                ) : <p>Loading</p>
                }
            </form>
        </div>
    )
}

export default Signup
