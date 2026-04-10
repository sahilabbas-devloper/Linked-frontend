import React from 'react'
import { useState } from 'react'
import Avatar from './avatar';
import { FaUser, FaBook, FaHandsHelping, } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { BsFillSendFill } from "react-icons/bs";
import axios from 'axios'
import debounce from "lodash.debounce"
import { useCallback } from 'react';
import CommentSection from "./commentsection"
const BASE_URL = import.meta.env.VITE_API_URL;

function Postcard({ post, Authuser }) {
    const [Likes, setLikes] = useState(post.likes || [])
    const isliked = Likes.some(id => String(id) === String(Authuser?._id))
    const [showComments, setShowComments] = useState(false)


    const debouncelike = useCallback(debounce(
        async () => {

            try {
                const res = await axios.post(`${BASE_URL}/api/posts/${post._id}/like`, {}, {
                    withCredentials: true
                })
                setLikes(res.data)
            } catch (error) {
                setLikes(post.likes)
            }
        }, 500),
        []
    )


    const handlelike = () => {

        // optimistic UI

        if (isliked) {
            setLikes(prev => prev.filter(id => String(id) !== String(Authuser._id)))
        } else {
            setLikes(prev => [...prev, Authuser._id])
        }

        // debounce request -- 500ms
        debouncelike();
    }








    const timeAgo = (date) => {
        const diff = Math.floor((Date.now() - new Date(date)) / 1000);
        return diff < 60 ? `${diff}s ago` : diff < 3600 ? `${Math.floor(diff / 60)}m ago` : diff < 86400 ? `${Math.floor(diff / 3600)}h ago` : `${Math.floor(diff / 86400)}d ago`;
    }

    return (
        <div>


            <div
                key={post._id}
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


                    <h1 className='text-[15px] text-gray-600 font-bold' >X</h1>
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
                            {Likes?.length || 0}
                        </div>
                    </div>


                    <div className='flex items-center justify-center p-2 gap-1'>
                        
                        <div className='text-sm font-medium text-gray-600'>
                            {post.comments?.length || 0} Comment
                        </div>
                    </div>

                </div>

                <div className='w-full h-auto flex items-center justify-between border-t'>

                    <button
                        onClick={handlelike}
                        className='flex flex-col items-center p-4'>
                        <div>
                            < AiFillLike
                                className={isliked ? "text-blue-600" : "text-gray-400"}
                            />
                        </div>
                        <div className='text-sm font-medium text-gray-600'>
                            Like
                        </div>
                    </button>

                    <div className='flex flex-col items-center p-4'>
                        <div>
                           <button onClick={() => setShowComments(!showComments)}>
                            💬 Comment
                        </button>

                        {showComments && (
                            <CommentSection postId={post._id} comments={post.comments}  onClose={() => setShowComments(false)}/>
                        )}
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


        </div>
    )
}

export default Postcard