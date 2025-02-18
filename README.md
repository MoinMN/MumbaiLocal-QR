# **MumbaiLocal-QR**  

MumbaiLocal-QR is a **MERN stack-based** web application that provides QR codes for multiple Mumbai local train stations, allowing users to book tickets conveniently at or near the station. It also includes a **public submission system** where anonymous users can contribute missing QR codes, which are then reviewed and approved via an **admin dashboard**.  

## **🚀 Live Demo**  

- **Frontend (React.js, Vite, Tailwind CSS)**: [MumbaiLocal-QR Frontend](https://mumbai-local-qr.vercel.app)  
- **Backend (Node.js, Express.js, MongoDB)**: [MumbaiLocal-QR Backend](https://mumbai-local-qr-api.vercel.app)  

---

## **📌 Features**  

### **User Features**  
✅ View QR codes of multiple Mumbai local train stations.  
✅ Submit missing QR codes **anonymously** through a public form.  

### **Admin Features**  
✅ Access an **admin dashboard** at `/admin`.  
✅ **Review & approve** QR codes submitted by the public.  
✅ Submit and **manage QR codes** directly.  

---

## **🛠 Tech Stack**  

- **Frontend**: React.js, Tailwind CSS, Vite  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (MongoDB Atlas)  
- **Authentication**: JWT (for admin access)  
- **Storage**: Cloudinary (for QR code images)  
- **Deployment**: **Vercel (Frontend & Backend)**  

---

## **🛠 Installation Guide**  

### **📌 Prerequisites**  

- **Node.js** installed  
- **MongoDB** (Local or Cloud)  

### **1️⃣ Clone the Repository**  

```sh
git clone https://github.com/MoinMN/MumbaiLocal-QR.git
cd MumbaiLocal-QR
```

### **2️⃣ Install Dependencies**  

```sh
cd client
npm install
cd ../server
npm install
```

### **3️⃣ Configure Environment Variables**  

#### **Frontend (`client/.env`)**  
```env
VITE_BACKEND_URL="your_backend_url"
```

#### **Backend (`server/.env`)**  
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=your_frontend_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### **4️⃣ Start the Application**  

#### **Backend (Server)**  
```sh
cd server
npm start
```

#### **Frontend (Client)**  
```sh
cd client
npm run dev
```

**🖥 Open `http://localhost:5173` in your browser.**  

---

## **📌 API Endpoints**  

### **🔹 Public Routes**  
- `GET /qr/get` → Fetch all available QR codes  
- `POST /qr/post` → Submit a new QR code (Anonymous)  

### **🔹 Admin Routes (Protected via JWT)**  
- `POST /auth/login` → Admin login  
- `GET /qr/pending-qr-admin` → Fetch pending QR codes  
- `PUT /qr/put-approve` → Approve a QR code  
- `DELETE /qr/delete-qr-admin` → Delete a QR code  
- `POST /qr/post-qr-admin` → Add a new QR code  

---

## **📌 Deployment on Vercel**  

### **🚀 Deploy Frontend to Vercel**  
```sh
cd client
vercel deploy --prod
```
👉 **Live:** [MumbaiLocal-QR Frontend](https://mumbai-local-qr.vercel.app)  

### **🚀 Deploy Backend to Vercel**  
```sh
cd server
vercel deploy --prod
```
👉 **Live:** [MumbaiLocal-QR Backend](https://mumbai-local-qr-api.vercel.app)  

---

## **🤝 Contributing**  

1. **Fork** the repo  
2. **Create a new branch** (`feature/new-feature`)  
3. **Commit your changes** and push  
4. **Submit a Pull Request**  

---

## **🚆 Made with ❤️ for Mumbai's Local Train Commuters!**  