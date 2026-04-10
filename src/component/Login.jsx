import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useState } from "react";
import Swal from "sweetalert2"
const BASE_URL = import.meta.env.VITE_API_URL;

function Login() {

    const [username, setusername] = useState('')
    const [passward, setpassward] = useState('')
    const [Loading, setloading] = useState()

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    const submit = async (e) => {
        e.preventDefault();

        setloading(true)

        try {
            const res = await axios.post(`${BASE_URL}/api/Login`, { username, passward, })

            Swal.fire({
                title: res.data.message,
                icon: "success",
                draggable: true
            });

            if (res.data.message == "Sucessfully Login.") {
                navigate("/Home")
            }
        } catch (error) {
            const msg = error.response?.data?.message || "Something went wrong!"
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: msg,
            });
        } finally {
            setloading(false)
        }

    }



    return (
        <div>
            <section className='bg-gray-100 w-full h-screen flex items-center justify-center'>

                <div className='w-full h-full flex items-center justify-center'>



                    <div className='flex flex-col  justify-start w-100 h-auto rounded-md   p-4'>

                        <form onSubmit={submit}
                            className='flex flex-col gap-8'
                        >
                            <div className='flex'>
                                <h1 className='text-2xl text-blue-800 font-bold '>Linked</h1>
                                <h1 className='bg-blue-800 text-xl font-semibold text-white  flex items-end rounded-sm justify-center w-8 h-7'>in</h1>
                                <h1 className='text-gray-300 flex items-end ml-1'>clone</h1>
                            </div>

                            <div>
                                <h1 className='text-3xl font-bold '>Login</h1>
                                <p className='text-sm font-semibold text-gray-500'>stay updated on your professional world.</p>
                            </div>


                            <div className='flex flex-col gap-3'>
                                <input type="name"
                                    value={username}
                                    required
                                    placeholder='name'
                                    onChange={(e) => setusername(e.target.value)}
                                    className={`$ w-full h-10 p-2 outline-none border rounded-sm`}
                                />



                                <input type="passward"
                                    value={passward}
                                    required
                                    placeholder='passward'
                                    onChange={(e) => setpassward(e.target.value)}
                                    className='w-full h-10 p-2 outline-none border rounded-sm'
                                />

                                <Link to={"/forget"} className='text-sm text-blue-800 font-semibold'>Forgot passward?</Link>
                            </div>

                            <button type="submit"
                                disabled={Loading}
                                className='w-full h-10 bg-blue-800 hover:bg-blue-700 flex items-center justify-center font-semibold text-white rounded-sm'>Sign in
                                {Loading && (
                                    <div className='fixed inset-0 bg-black/20 flex items-center justify-center z-50'>

                                        <div className='w-14 h-14 border-4 border-blue-800 border-t-transparent rounded-full animate-spin'></div>
                                    </div>

                                )}

                            </button>


                        </form>
                        <div className='flex items-center justify-center mt-5 mb-5'>
                            <p className='text-sm  text-gray-700 font-semibold'>you have already account? <Link to={"/Rajister"} className='text-md text-blue-800 font-semibold'>Signin now</Link></p>
                        </div>

                    </div>


                </div>
            </section>
        </div>
    )
}

export default Login