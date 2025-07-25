# 🏟️ Active Arena – Sports Club Management System (Client)

**Mi-12 Assignment 12 | Assignment12_category_023**

This is the **frontend** of the **Active Arena** — a dynamic and responsive **Sports Club Management System (SCMS)**. It allows users to register, book courts, make payments, and more, with separate dashboards for **User**, **Member**, and **Admin** roles.

🔗 **Live Site:** [https://buildbox-a12.web.app](https://buildbox-a12.web.app)  
👤 **Admin Email:** `admin@activearena.com`  
🔒 **Admin Password:** `admin123`

---

## 📌 Key Features

- 🔐 **Role-based Authentication** (Firebase + JWT)
- 🧑‍💼 **3 User Dashboards**:
  - User (basic booking)
  - Member (approved + payment)
  - Admin (management)
- 🏸 **Court Booking System** with slot, date, and session selection
- 💸 **Stripe Payment Integration** with **coupon discount** support
- 📋 **Announcements** module
- 📑 **Booking History**, **Payment History** (with layout switcher)
- 🧾 **Coupon Management**, **Court Management**
- 💬 **SweetAlert2** & **Toast** notifications for CRUD & auth events
- 📱 Fully **Responsive UI** for mobile, tablet, and desktop
- 🧠 Uses **TanStack Query** for GET and **Mutation** for POST/PUT/DELETE
- 🔒 **Protected Routes** with JWT token check
- 🌍 Google Map-style location section
- 🔁 Axios Interceptor to manage auth headers

---

## 🛠 Tech Stack

### 🔧 Frontend

- **React 19 + Vite**
- **Tailwind CSS** + **DaisyUI**
- **React Router v7**
- **TanStack React Query**
- **Stripe.js** & **React Stripe JS**
- **SweetAlert2**, **React Toastify**
- **Swiper.js** for banners
- **Firebase Auth** (v11)
- **React Hook Form** + **Framer Motion**

---

## 🧪 Run Locally

### 1. Clone the repo:

```bash
git clone https://github.com/hasancodex/active-arena-client.git
cd active-arena-client
```

### 2. Install dependencies:

```bash
pnpm install
```

### 3. Create `.env` file in root folder:

```env
VITE_API_URL=https://your-api.com
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Start development server:

```bash
pnpm run dev
```

---

