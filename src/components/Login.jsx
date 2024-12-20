import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'
import aurhService from '../appWrite/auth'
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
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const loginHandler = async (e) => {
        try {
            setError("")
            setLoading(true)
            e.preventDefualt()
            const session = await aurhService.login({ email: values.email, password: values.password})
            if (session) {
                const userData = await aurhService.getCurrentUser()
                dispatch(login({ userData }))
                navigate('/')
            }
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }


    }


    return (
        <div>
            <div>
                <h2>Login Your Acount</h2>
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
                    onChange={(e) => handleChange(e)}

                />
                <Input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    label="password: "
                    onChange={(e) => handleChange(e)}
                />
                {!loading ? (
                    <Button>
                        Login
                    </Button>
                ) : <p>Loading</p>
                }
            </form>

        </div>
    )
}

export default Login
