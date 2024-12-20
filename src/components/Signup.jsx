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
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
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
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div>
                <h2>Signup Your Acount</h2>
                <p>
                    Do you have account
                    <Link to={'/login'}>
                        Signup
                    </Link>
                </p>
            </div>
            {error && <p>{error}</p>}
            <form onSubmit={signupHandler}>
                <Input
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    label="Name: "
                    onChange={(e) => handleChange(e)}

                />
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
                        Signup
                    </Button>
                ) : <p>Loading</p>
                }
            </form>
        </div>
    )
}

export default Signup
