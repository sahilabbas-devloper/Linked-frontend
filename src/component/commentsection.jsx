import { useState } from "react"
import axios from "axios"
const BASE_URL = import.meta.env.VITE_API_URL;

const CommentSection = ({ postId, onClose }) => {
    const [comments, setComments] = useState()
    const [text, setText] = useState("")


    const handleSubmit = async () => {

        try {
            const res = await axios.post(
                `${BASE_URL}/api/posts/${postId}/comments`,
                { text },
                { withCredentials: true }
            )
            setComments(res.data)


        } catch (error) {
            console.log("comment error", error)
        }
    }
  

    return (
        <div className="fixed inset-0 bg-white z-50 flex  flex-col">

            {/* Header */}

            <div className="flex items-center gap-4 px-4 py-3 border-b">
                <button onClick={onClose} className="text-sm text-gray-800 rounded-2xl bg-gray-200 font-semibold p-2 ">
                    ← Back
                </button>
                <h2 className="text-lg font-semibold text-gray-600">Comments</h2>
            </div>

            {/* Comments List */}

            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
              
                {comments && comments.map((comment, index) => (
                    <div key={index} className="flex gap-2 items-start">
                       
                        <div className="bg-gray-100 rounded-xl px-3 flex items-center gap-2 py-2 text-sm w-full">
                            <img className="w-8 h-8 rounded-full"  src={comment.user.profilepic} alt="" />
                           <div> <p className="font-semibold">
                                {comment.user?.username}
                            </p>
                            <p className="text-gray-700">{comment.text}</p></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Box - bottom pe fixed */}
            <div className="flex gap-2 px-4 py-3 border-t">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
                >
                    Post
                </button>
            </div>

        </div>
    )
}

export default CommentSection