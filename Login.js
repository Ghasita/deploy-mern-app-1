
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../util'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const [login, setLogin] = useState({

        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        const { name, value } = e.target;

        const copylogin = { ...login }
        copylogin[name] = value
        setLogin(copylogin)

    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = login;
        if (!email || !password)
            return handleError('email,password required')
        try {
            const url = "http://localhost:8080/api/login";
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(login)
            }
            )
            const result = await response.json();
            const { success, message, jwtToken, name, err } = result;
            if (success) {
                handleSuccess(message)
                localStorage.setItem('token', jwtToken)
                localStorage.setItem('loggedInUser', name)
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            }
            else {
                handleError(err); //message
            }

        } catch (err) {
            handleError(err)
        }
    }

    return (
        <div>
            <div className='container bg-light border border-black border-readius  w-25 mt-5'>
                <h1>Log in</h1>
                <form onSubmit={handleLogin} >
                    <div className='mb-3  '>




                    </div>
                    <div className='mb-3 '>

                        <input
                            onChange={handleSubmit}
                            type="email"
                            name="email"
                            placeholder='Email'
                            value={login.email} />

                    </div>
                    <div className='mb-3'>
                        <input
                            onChange={handleSubmit}
                            type="password"
                            name='password'
                            placeholder='Password'
                            value={login.password} />

                    </div>
                    <button className='btn btn-success' type='submit'>Log in</button><br></br>
                    <span className='me-5'>Do not have account</span>
                    <Link to='/signup'>Sign up</Link>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}





export default Login