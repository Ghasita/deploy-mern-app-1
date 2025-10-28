import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../util'
import { useNavigate } from 'react-router-dom'
const Signup = () => {

    const [signup, setSignup] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        const { name, value } = e.target;

        const copysignup = { ...signup }
        copysignup[name] = value
        setSignup(copysignup)

    }
    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signup;
        if (!name || !email || !password)
            return handleError('Fill all fields')
        try {
            const url = "http://localhost:8080/api/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signup)
            }
            )
            const result = await response.json();
            const { success, message } = result;
            if (success) {
                handleSuccess(message)
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }
            else {
                handleError(message);
            }

        } catch (err) {
            handleError(err)
        }
    }

    return (
        <div>
            <div className='container bg-light border border-black border-readius  w-25 mt-5'>
                <h1>Sign Up</h1>
                <form onSubmit={handleSignup} >
                    <div className='mb-3  '>


                        <input
                            onChange={handleSubmit}
                            type="text"
                            name="name"
                            autoFocus
                            placeholder='name'
                            value={signup.name}
                        />

                    </div>
                    <div className='mb-3 '>

                        <input
                            onChange={handleSubmit}
                            type="email"
                            name="email"
                            placeholder='Email'
                            value={signup.email} />

                    </div>
                    <div className='mb-3'>
                        <input
                            onChange={handleSubmit}
                            type="password"
                            name='password'
                            placeholder='Password'
                            value={signup.password} />

                    </div>
                    <button className='btn btn-success' type='submit'>Signup</button><br></br>
                    <span className='me-5'>already have account</span>
                    <Link to='/login'>Login</Link>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Signup