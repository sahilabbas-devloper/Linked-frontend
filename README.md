🔗 LinkedUp — Professional Networking App

A full-stack LinkedIn-inspired professional networking platform built with the MERN stack.

🌐 Live Demo: linkup-a.vercel.app
📁 GitHub: github.com/sahil/linkedup

✨ Features

🔐 JWT Authentication — Secure login/signup with HTTP-only cookies
👤 User Profiles — Bio, skills, profile picture via Cloudinary
📝 Posts & Feed — Create, like, and comment on posts
🔔 Real-time Notifications — Bell icon with unread badge, polling-based updates
🤝 Connection System — Send, accept, reject connection requests
📱 Responsive UI — Mobile-first design with Tailwind CSS


🛠️ Tech Stack
LayerTechnologyFrontendReact.js, Tailwind CSS, AxiosBackendNode.js, Express.js, REST APIDatabaseMongoDB, MongooseAuthJWT, bcrypt, HTTP-only cookiesMediaCloudinary, Multer (memory storage)

🚀 Getting Started
Prerequisites

Node.js v18+
MongoDB Atlas account
Cloudinary account

Installation
bash# Clone the repo
git clone https://github.com/sahil/linkedup.git
cd linkedup

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
Environment Variables
Create a .env file in the /backend folder:
envPORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
Run Locally
bash# Start backend (from /backend)
npm run dev

# Start frontend (from /frontend)
npm run dev

📸 Screenshots

Add screenshots here


🧠 Key Learnings

Implemented Mongoose populate() for nested document references
Handled Cloudinary uploads using memory storage on Render (no ephemeral filesystem issues)
Built real-time notification polling with react-hot-toast and bell badge


👨‍💻 Author
Sahil — Fresher MERN Stack Developer
📧 Sa9300421@gmail.com | 📱 +91 7080254021
