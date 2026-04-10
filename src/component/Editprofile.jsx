import React, { useState } from 'react'
import axois from "axios"
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_API_URL;

function Editprofile() {
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [bio, setbio] = useState('')
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [Location, setLocation] = useState('')
    const [Loading, setloading] = useState()

    const navigate = useNavigate()

    const update = async () => {

        const formdata = new FormData()
        formdata.append("myimg", file)
        formdata.append("bio", bio)
        formdata.append("name", name)
        formdata.append("email", email)
        formdata.append("Location", Location)

        setloading(true)

        // backend call 
        try {
            const res = await axois.put(`${BASE_URL}/api/Update`, formdata, {
                withCredentials: true
            })

            Swal.fire({
                title: res.data.message,
                icon: "success",
                draggable: true
            });

        } catch (error) {
            console.log("axios post error", error)
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

            <section className='bg-[#f3f2ef] min-h-screen flex items-center justify-center p-5'>

                {/* loader */}

                {Loading && (
                    <div className='fixed inset-0 bg-black/20 flex items-center justify-center z-50'>

                        <div className='w-14 h-14 border-4 border-blue-800 border-t-transparent rounded-full animate-spin'></div>
                    </div>

                )}


                <div className='bg-white rounded-xl shadow-md w-full max-w-lg overflow-hidden'>

                    {/* Header */}
                    <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200'>
                        <div>
                            <p className='text-[11px] text-gray-400'>Update</p>
                            <h1 className='text-2xl font-semibold font-serif text-gray-900'>Profile</h1>
                        </div>
                        <button
                            onClick={() => navigate(-1)}
                            className='border border-gray-300 rounded-full px-4 py-1.5 text-sm text-gray-500 hover:bg-gray-100 transition'>
                            ← Back
                        </button>
                    </div>

                    {/* Body */}
                    <div className='flex flex-col gap-4 p-6'>

                        {/* Image Preview */}
                        <div className={`w-20 rounded-full  flex items-center justify-center overflow-hidden border-2 border-dashed transition  
                     ${preview ? 'border-blue-600' : 'border-gray-200 bg-gray-50'}`}>
                            {preview
                                ? <img src={preview} alt="preview" className='w-20 h-20 object-cover rounded-full' />
                                : <p className='text-gray-300 text-[10px]'>Image preview will appear here</p>
                            }
                        </div>

                        {/* File Input */}
                        <label className='flex items-center gap-3 bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition text-sm text-gray-500'>
                            📁 <span className='truncate'>{file ? file.name : 'Choose image to upload'}</span>
                            <input type="file" accept="image/*" className='hidden'
                                onChange={(e) => {
                                    const selected = e.target.files[0]
                                    if (!selected) return
                                    setFile(selected)
                                    setPreview(URL.createObjectURL(selected))
                                }}
                            />
                        </label>


                        {/* username */}
                        <div>
                            <textarea
                                placeholder='Enter your name.'
                                maxLength={200}
                                onChange={(e) => setname(e.target.value)}
                                className='w-full border border-gray-300 rounded-lg p-3 text-sm outline-none resize-none h-13 focus:border-blue-600 transition'
                            />
                            <p className='text-right text-[11px] text-gray-400'>{bio.length}/200</p>
                        </div>




                        {/* Bio */}
                        <div>
                            <textarea
                                placeholder='Enter your bio.'
                                maxLength={200}
                                onChange={(e) => setbio(e.target.value)}
                                className='w-full border border-gray-300 rounded-lg p-3 text-sm outline-none resize-none h-13 focus:border-blue-600 transition'
                            />
                            <p className='text-right text-[11px] text-gray-400'>{bio.length}/200</p>
                        </div>


                        {/* Location */}
                        <div>
                            <textarea
                                placeholder='Enteryour Location.'
                                onChange={(e) => setLocation(e.target.value)}
                                className='w-full border border-gray-300 rounded-lg p-3 text-sm outline-none resize-none h-12 focus:border-blue-600 transition'
                            />
                        </div>

                        {/* email */}
                        <div>
                            <textarea
                                placeholder='Enteryour email.'
                                onChange={(e) => setemail(e.target.value)}
                                className='w-full border border-gray-300 rounded-lg p-3 text-sm outline-none resize-none h-12 focus:border-blue-600 transition'
                            />
                        </div>




                        {/* Submit */}
                        <button
                            onClick={update}
                            disabled={Loading}
                            className='w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-full py-3 text-sm transition'
                        >

                            Post
                        </button>

                    </div>
                </div>
            </section>










        </div>
    )
}

export default Editprofile