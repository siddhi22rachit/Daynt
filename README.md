# Dashboard Project

## Overview
This is a **React-based Dashboard** that allows users to **add, edit, delete, and view data**. The project uses **Node.js, Express, MongoDB, and React (MERN stack)**. It also includes authentication and API integration using Axios.

## Features
- **User Authentication:** Secure login/logout system
- **Data Management:** Add, edit, delete, and view data
- **Age Calculation:** Automatically calculates age based on DOB
- **Interactive UI:** Responsive dashboard with Toast notifications

## Technologies Used
- **Frontend:** React, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Notifications:** React-Toastify

---
## Installation and Setup

### **1. Clone the Repository**
```sh
 git clone https://github.com/siddhi22rachit/Daynt.git
 cd Daynt
```

### **2. Setup the Backend**
```sh
 cd backend
 npm install
```

#### **Create a `.env` file in the `backend` folder:**
```sh
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

#### **Run the Backend Server**
```sh
 npm start
```

---
## **3. Setup the Frontend**
```sh
 cd ../frontend
 npm install
```

#### **Run the React App**
```sh
 npm start
```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000`.

---
## **API Endpoints**
### **User Authentication**
- `POST /api/auth/login` → Login user
- `POST /api/auth/register` → Register new user
- `POST /api/auth/logout` → Logout user

### **Data Management**
- `GET /api/data` → Get all data
- `POST /api/data` → Add new data
- `PUT /api/data/:id` → Update existing data
- `DELETE /api/data/:id` → Delete data

---
## **Usage**
1. **Login/Register** to access the dashboard.
2. Click **"+ Add New Data"** to open the modal and add new entries.
3. Use **"Edit"** and **"Delete"** buttons for modifying records.
4. Click **"Logout"** to end the session.

---

---
## **Contributing**
Feel free to contribute by submitting pull requests.

---
## **License**
This project is licensed under the MIT License.

