import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import axios from "axios"
const BASE_URL = import.meta.env.VITE_API_URL;

const Notifications = () => {
    const [notifications, setNotifications] = useState([])
    const [shownIds, setShownIds] = useState([])

    const fetchNotifications = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/notification/send`, {
                withCredentials: true
            })
            const data = Array.isArray(res.data) ? res.data : []

            const newNotifs = data.filter(n => !shownIds.includes(n._id))

            newNotifs.forEach(n => {
                toast(`🔔 ${n.sender.username} liked your post`, {
                    duration: 4000,
                    position: "top-right",
                })
            })

            setShownIds(data.map(n => n._id))
            setNotifications(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // Pehli baar turant fetch karo
        fetchNotifications()

        // Har 15 seconds mein fetch karo (polling)
        const interval = setInterval(fetchNotifications, 30000)

        // Cleanup
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>

            {notifications.length === 0 ? (
                <p className="text-gray-500">No notifications yet</p>
            ) : (
                notifications.map((notif) => (
                    <div key={notif._id} className="flex items-center gap-3 p-3 border-b">
                        {/* Profile pic */}
                        <img
                            src={notif.sender.profilepic}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        {/* Message */}
                        <p className="text-sm">
                            <span className="font-semibold">{notif.sender.username}</span>
                            {notif.type === "like" && " liked your post"}
                            {notif.type === "follow" && " followed you"}
                            {notif.type === "comment" && " commented on your post"}
                        </p>
                    </div>
                ))
            )}
        </div>
    )
}

export default Notifications