import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess, handleError } from '../util.js'
import { ToastContainer } from 'react-toastify'
const Home = () => {
    const navigate = useNavigate()
    const [loggedInuser, setLoggedInuser] = useState('')
    const [prods, setProds] = useState([])
    useEffect(() => {
        setLoggedInuser(localStorage.getItem('loggedInUser'))

    }, [])
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUser')
        handleSuccess('User logged out')
        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }
    const fetchProducts = async () => {
        try {
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch("http://localhost:8080/pro", headers)
            const result = await response.json();
            setProds(result)
            console.log(result)
        } catch (err) {
            handleError(err)

        }

    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <>
            <div className='d-flex justify-content-center mt-2'>
                <h1>Home</h1>
            </div>
            <div className='d-flex justify-content-center mt-2'>
                ! Welcome  {loggedInuser}

            </div>
            <div className=' d-flex justify-content-center mt-2' >
                <button className='btn btn-warning btn-small' onClick={handleLogout}>Log Out</button>
            </div>
            <ToastContainer />
            {
                prods && prods.map((l, m) => {
                    return (
                        <ul key={m}>
                            <li>{l.item}</li>
                            <li>{l.price}</li>
                        </ul>
                    )
                })
            }
        </>

    )
}

export default Home