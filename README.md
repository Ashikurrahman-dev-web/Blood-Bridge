# 🩸 Blood Donation and Purchasing Management System

A full-stack Blood Donation Management System that connects blood donors with recipients, making the blood donation process faster, easier, and more organized.

## 🌐 Live Website

**Live Demo:**  https://blood-bridge-sage.vercel.app

---

## 🚀 Features

### 👤 Authentication

* Secure user registration and login
* Better Auth authentication
* JWT protected API routes
* Role-based authorization

### 🩸 Donor Features

* Create blood donation requests
* View personal donation requests
* Update donation request information
* Delete donation requests
* Search blood donors by:

  * Blood Group
  * District
  * Upazila
* View donor profile
* Update profile information

### 🛠️ Admin Features

* Dashboard statistics
* Manage all users
* Block / Unblock users
* Promote donor to volunteer
* Promote user to admin
* Manage all blood donation requests
* Change donation request status

### ❤️ Blood Donation

* Create donation request
* Accept donation requests
* Track donation status
* Pending
* In Progress
* Done
* Canceled

### 🔍 Search System

* Search donors by blood group
* Search donors by district
* Search donors by upazila

### 💳 Funding

* Stripe payment integration
* Donate funds securely
* Funding history
* Funding statistics

---

## 🛠️ Technologies Used

### Frontend

* Next.js 16
* React.js
* Tailwind CSS
* HeroUI
* React Hook Form
* React Hot Toast
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* MongoDB Driver
* Better Auth
* JWT
* Stripe API

---

## 📦 NPM Packages

### Client

```bash
next
react
tailwindcss
@heroui/react
react-hot-toast
react-hook-form
lucide-react
better-auth
framer-motion
axios
stripe
@stripe/react-stripe-js
@stripe/stripe-js
```

### Server

```bash
express
mongodb
cors
dotenv
jose-cjs
stripe
```

---

## 📂 Project Structure

```
client/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── providers/
│
server/
│
├── index.js
├── package.json
└── .env
```

---

## ⚙️ Environment Variables

### Client (.env.local)

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

### Server (.env)

```env
PORT=
MONGODB_URI=
CLIENT_URL=
STRIPE_SECRET_KEY=
```

---

## 💻 Installation

Clone the repository

```bash
git clone https://github.com/your-username/blood-donation.git
```

Go to the project directory

```bash
cd blood-donation
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Run backend

```bash
npm start
```

---

## 👨‍💻 Author

**Ashikur Rahman**

GitHub: https://github.com/Ashikurrahman-dev-web

---

## ❤️ Thank You

Every drop of blood can save a life.

Thank you for supporting voluntary blood donation.
