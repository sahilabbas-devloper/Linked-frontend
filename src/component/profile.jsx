import Avatar from './avatar';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { BsFillSendFill } from "react-icons/bs";
const BASE_URL = import.meta.env.VITE_API_URL;

function Profile() {

  const [user, setuser] = useState()
   const [refresh, setrefresh] = useState()
  const [name, setname] = useState()
  const [bio, setbio] = useState()
  const [Location, setLocation] = useState()
  const [email, setemail] = useState()
  const [loading, setloading] = useState()
  const [post, setpost] = useState()
  const [postlength, setpostlength] = useState()


  const navigate = useNavigate()


  useEffect(() => {
    const Profiledata = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/profile`, {
          withCredentials: true

        })

        setuser(res.data)
        setname(res.data.username)
        setemail(res.data.email)
        setbio(res.data.bio)
        setLocation(res.data.Location)
      } catch (error) {
        const msg = error.response?.data?.message || "Something went wrong!"
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: msg,
        });

      }
    }
    Profiledata()

  }, [])


  // get post api...

  useEffect(() => {
    const Profiledata = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/userpost`, {
          withCredentials: true

        })

        setpost(res.data.posts)
        setpostlength(res.data.posts.length)

      } catch (error) {
        const msg = error.response?.data?.message || "Something went wrong!"
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: msg,
        });

      }
    }
    Profiledata()

  }, [refresh])




  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 1000);
    return diff < 60 ? `${diff}s ago` : diff < 3600 ? `${Math.floor(diff / 60)}m ago` : diff < 86400 ? `${Math.floor(diff / 3600)}h ago` : `${Math.floor(diff / 86400)}d ago`;
  }



  const handledelete = async (postId) => {


    setloading(true)

    try {
      const res = await axios.delete(`${BASE_URL}/api/Deletepost/${postId}`, {
        withCredentials: true
      })

      Swal.fire({
        title: res.data.message,
        icon: "success",
        draggable: true
      });

      setrefresh(!refresh)
      
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
      <section className='bg-[#f9f9f7] min-h-screen w-full flex flex-col overflow-hidden '>

        {loading && (
          <div className='fixed inset-0 bg-black/20 flex items-center justify-center z-50'>

            <div className='w-14 h-14 border-4 border-blue-800 border-t-transparent rounded-full animate-spin'></div>
          </div>

        )}
        {/* navbar */}

        <div className='bg-white shadow-sm  w-full md:min-w-screen h-14 fixed flex items-center justify-between p-2 pr-7 '>

          <div className='flex gap-1'>

            <div className='bg-[#550cdb] w-8 h-8 rounded-lg shadow-xl flex items-center justify-center font-semibold text-white'>
              in
            </div>

            <button className='text-black font-semibold text-lg'>
              LinkedUp
            </button>
          </div>

          <button
            onClick={() => navigate(-1)}
            className='border border-gray-300 rounded-full px-4 py-1.5 text-sm text-gray-500 hover:bg-gray-100 transition'>
            ← Back
          </button>

        </div>



        <div className='flex flex-col md:flex-row w-full min-h-screen mt-14 items-center p-4 gap-10 bg-[#f9f9f7]'>



          {/* Profile card */}
          <div className='bg-white rounded-2xl w-full border-gray-100 shadow-sm overflow-hidden '>

            {/* cover */}
            <div className='w-full h-20 bg-linear-to-r from-blue-600 to-purple-700 '></div>

            <div className='w-full p-4 flex items-center justify-between'>
              <Avatar user={user} size={55} />

              <Link to={"/Editprofile"} className='bg-white rounded-3xl flex items-center justify-center text-indigo-700  w- h-9 p-2 text-sm font-semibold border border-indigo-600'>
                Edit Profile
              </Link >

            </div>

            <div className='w-full h-auto p-3 border-b border-gray-200 pl-6'>
              <h1 className='text-xl font-bold text-gray-800' >{name}</h1>
              <p className='text-sm text-gray-500 mt-1 '>{bio}</p>
              <div className='flex gap-9 text-gray-400 mt-1 text-xs mb-2'>
                <p><span> 📍</span>{Location}</p>
                <p><span className='text-indigo-600'>✉️ </span>{email}</p>
              </div>
            </div>

            <div className='flex flex-col  w-full h-auto p-4'>
              <h1 className='text-lg font-bold text-gray-800' >
                {postlength}
              </h1>
              <p className='flex  text-gray-400  text-sm'>Post</p>
            </div>



          </div>

          {/* Posts and about */}

          <div className='bg-white rounded-2xl w-auto md:w-150 border-gray-100 shadow-sm overflow-hidden  overflow-y-auto  flex flex-col gap-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden  '>

            {/* Posts */}
            <div className='  overflow-y-auto  flex flex-col gap-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden h-140 p-4'>

              {

                post && post.map((post, i) => (



                  <div
                    key={i}
                    className='flex flex-col md:w-90 w-full h-130 bg-white shadow-sm rounded-sm '>

                    <div className='flex items-center gap-2 justify-between p-3'>

                      <div className='flex gap-2'>
                        <Avatar user={post.user} size={44} />

                        <div>
                          <h1 className='text-sm font-semibold text-gray-800'>{post.user.username}</h1>
                          <p className='text-[12px] text-gray-600 font-normal'>{post.user.bio}</p>
                          <p className='text-[11px] font-normal text-gray-600'>{timeAgo(post.createdAt)}</p>
                        </div>


                      </div>


                      <button onClick={() => handledelete(post._id,)} className='text-[15px] text-gray-600 font-bold' >
                         {loading && (
                                    <div className='fixed inset-0 bg-black/20 flex items-center justify-center z-50'>

                                        <div className='w-14 h-14 border-4 border-blue-800 border-t-transparent rounded-full animate-spin'></div>
                                    </div>

                                )}
                        X</button>
                    </div>

                    <div className='w-full h-auto p-2'>
                      <h1 className='text-[13px] text-gray-600 font-normal'>{post.text}</h1>
                    </div>

                    <div className='w-full h-96 object-cover overflow-hidden items-center justify-center flex '>
                      <img src={post.img} alt="post" />
                    </div>

                    <div className='flex  items-center justify-between'>

                      <div className='flex items-center justify-center p-2 gap-1'>
                        <div>
                          < AiFillLike

                          />
                        </div>
                        <div className='text-sm font-medium text-gray-600'>
                          {post.likes?.length || 0}
                        </div>
                      </div>


                      <div className='flex items-center justify-center p-2 gap-1'>
                        <div>
                          < BiCommentDetail />
                        </div>
                        <div className='text-sm font-medium text-gray-600'>
                          {post.comments?.length || 0} Comment
                        </div>
                      </div>

                    </div>

                    <div className='w-full h-auto flex items-center justify-between border-t'>

                      <div className='flex flex-col items-center p-4'>
                        <div>
                          < AiFillLike />
                        </div>
                        <div className='text-sm font-medium text-gray-600'>
                          Like
                        </div>
                      </div>

                      <div className='flex flex-col items-center p-4'>
                        <div>
                          < BiCommentDetail />
                        </div>
                        <div className='text-sm font-medium text-gray-600'>
                          Comment
                        </div>
                      </div>

                      <div className='flex flex-col items-center p-4'>
                        <div>
                          <BsFillSendFill />
                        </div>
                        <div className='text-sm font-medium text-gray-600'>
                          Send
                        </div>
                      </div>
                    </div>

                  </div>


                ))}

            </div>






          </div>


        </div>

      </section>
    </div>
  )
}

export default Profile