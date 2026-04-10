import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import { FaUser, FaBook, FaHandsHelping, } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { BiBell } from 'react-icons/bi';
import Swal from "sweetalert2"
import Avatar from './avatar';
import Postcard from './Postcard';
import Hamburger from 'hamburger-react'
const BASE_URL = import.meta.env.VITE_API_URL;



function Home() {

  const [name, setname] = useState()
  const [Loading, setloading] = useState()
  const [posts, setposts] = useState([])
  const [isopen, setopen] = useState(false)



  const called = useRef(false)
  const navigate = useNavigate()



  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const fun = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/profile`, {
          withCredentials: true

        })
        setname(res.data)

      } catch (error) {
        const msg = error.response?.data?.message || "Something went wrong!"
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: msg,
        });
        navigate('/Login')
      }
    }
    fun()

    const getpost = async () => {


      try {
        const res = await axios.get(`${BASE_URL}/api/getposts`, {
          withCredentials: true
        })


        setposts(res.data.posts)



      } catch (error) {
        const msg = error.response?.data?.message || "Something went wrong!"
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: msg,
        });
      }

    }
    getpost()


  }, [])



  const Signout = async (e) => {

    e.preventDefault();
    setloading(true)
    try {
      const res = await axios.post(`${BASE_URL}/api/Signout`, {}, {
        withCredentials: true
      })

      Swal.fire({
        icon: "success",
        text: res.data.message,
      });
      navigate('/login')
    } catch (error) {
      console.log("sign out error", error)
    } finally {
      setloading(false)
    }


  }



  return (
    <div className=''>



      <section className='w-full bg-[#f9f8f6] min-h-screen flex items-center justify-center'>
        <div className='w-full h-screen  flex items-center gap-2'>

          <aside className={`w-70 h-screen md:flex flex-col justify-start z-50 fixed transition-transform duration-500 ease-in-out ${isopen ? "translate-x-0" : "-translate-x-150"}  shadow-sm  items-center bg-white`}>
            <div className='w-full text-2xl text-white font-bold pr-2 flex items-center justify-end h-10 bg-linear-to-r from-blue-600 to-purple-700 '>
              <button onClick={() => setopen(false)}>
                <MdArrowBack />
              </button>

            </div>

            <div className='w-full h-auto flex flex-col items-center justify-center p-3'>

              <Link to={"/Profile"}>
                <Avatar user={name} size={44} />
              </Link>



              <div className='flex flex-col items-center   p-2 w-full h-auto'>
                <h1 className='text-lg font-semibold'>{name?.username || "guest"}</h1>
                <p className='text-[12px] font-semibold text-gray-500'>{name?.bio || "guest"}</p>
              </div>

              <div className='flex flex-col p-3 gap-4 w-full h-auto pt-12'>

                <div className='flex gap-4 w-full items-center '>
                  <div>
                    <FaUser />
                  </div>
                  <Link to={"/Profile"} className='text-lg font-semibold'>Acount info</Link>
                </div>

                <div className='flex gap-4 w-full items-center '>
                  <div>
                    <FaBook />
                  </div>
                  <Link to={"/AddPost"} className='text-lg font-semibold'>Add Post</Link>
                </div>



                <div className='flex gap-4 w-full items-center '>
                  <div>
                    <FaHandsHelping />
                  </div>
                   <Link to={"/Profile"} className='text-lg font-semibold'>My post</Link>
                </div>


              </div>


              <div className='w-full h-full flex items-end mt-60 p-2'>
                <button
                  disabled={Loading}
                  onClick={Signout}
                  className='bg-blue-800 w-full h-11 flex items-center justify-center text-white font-bold rounded-xl'>sign out
                  {Loading && (
                    <div className='fixed inset-0 bg-black/20 flex items-center justify-center z-50'>

                      <div className='w-14 h-14 border-4 border-blue-800 border-t-transparent rounded-full animate-spin'></div>
                    </div>

                  )}
                </button>
              </div>


            </div>
          </aside>


          <nav className='  w-full h-full gap-1  '>

            <div className='bg-white shadow-sm  w-full md:w-full h-14 fixed flex items-center justify-between p-2 '>

              <div className=' gap-1 md:flex items-center hidden '>
                <div className='bg-[#550cdb] w-8 h-8 rounded-lg shadow-xl flex items-center justify-center font-semibold text-white'>
                  in
                </div>

                <button className='text-black font-semibold text-lg'>
                  LinkedUp
                </button>
              </div>


              <div className=" xl:w-96 hidden">
                <input
                  type="search"
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-3 focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  id="exampleSearch"
                  placeholder="Type query" />
              </div>

              <div className=' w-full flex items-center p-2 gap-1.5 justify-between'>


                <Link to={"/Profile"}>
                  <Avatar user={name} size={44} />
                </Link>

                <div className='flex items-center'>
                  <Link to={"/notification"}
                    className='text-2xl'
                  >
                    <BiBell />
                  </Link>

                  
                    <Hamburger toggled={isopen} toggle={setopen}/>

                  </div>

                





              </div>

            </div>

            <main className='w-full h-screen md:h-140 mt-14 overflow-y-auto p-2 flex flex-col md:flex-row md:flex-wrap gap-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>


              {/*cards/*/}

              {
                posts.map((post) => (

                  <Postcard key={post._id} post={post} Authuser={name} />
                ))}



            </main>

          </nav>



        </div>
      </section>
    </div>
  )
}

export default Home