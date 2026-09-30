# 🖥️ NexaDesk — IT Support & Ticketing System

<p align="center">
  <strong>A web-based IT Support and Service Desk platform for managing technical support requests.</strong>
</p>

<p align="center">
  <a href="https://github.com/Ichan-creator/NexaDesk">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository">
  </a>
  <a href="YOUR_RENDER_URL">
    <img src="https://img.shields.io/badge/Live%20Demo-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Live Demo">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-24.x-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/EJS-Templates-B4CA65?style=for-the-badge&logo=ejs&logoColor=white">
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-technologies">Technologies</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-render-deployment">Deployment</a> •
  <a href="#-project-structure">Structure</a>
</p>

---

## 🌐 Project Links

| Resource                 | Link                                                          |
| ------------------------ | ------------------------------------------------------------- |
| 💻 **GitHub Repository** | [View Source Code](https://github.com/Ichan-creator/NexaDesk) |
| 🚀 **Live Demo**         | [Open NexaDesk](https://nexadesk-zmu6.onrender.com)                              |

> **Note:** Replace `https://nexadesk-zmu6.onrender.com` with your actual Render URL after deployment.

---

## 📌 About NexaDesk

**NexaDesk** is a web-based **IT Support and Service Desk platform** designed to organize and manage technical support requests.

It allows users to submit and track IT support tickets while providing administrators with tools to review, respond to, and manage service requests and user accounts.

The application is built using **Node.js, Express.js, EJS, and MySQL** and is configured for deployment on **Render**.

---

## ✨ Features

### 👤 User Features

* 🔐 User registration and login
* 🛡️ Secure user authentication
* 🎫 Create IT support tickets
* ⚡ Select ticket priority
* 📊 Track ticket status
* 📄 View ticket details and updates
* 💬 Reply to support tickets
* 🔔 Receive ticket notifications
* 👤 View and manage user profile
* 📱 Responsive interface for desktop and mobile devices

### 🛠️ Administrator Features

* 🔑 Dedicated administrator login
* 📊 Administrator dashboard
* 🎫 View and manage support tickets
* 📄 View ticket details
* 💬 Reply to users
* 🔄 Update ticket status
* ⚡ Update ticket priority
* 📝 Add ticket updates and notes
* 👥 Manage user accounts
* 🟢 Activate or deactivate user accounts
* 📈 View ticket statistics
* 🔎 Search and organize support requests

---

## 🎫 Ticket Management

NexaDesk supports different ticket statuses to organize the IT support workflow.

| Status             | Description                           |
| ------------------ | ------------------------------------- |
| 🟢 **Open**        | Newly submitted support request       |
| 🔵 **In Progress** | Ticket is currently being handled     |
| 🟣 **Resolved**    | The reported issue has been addressed |
| ⚫ **Closed**       | Ticket has been completed and closed  |

### ⚡ Priority Levels

* 🟢 **Low**
* 🔵 **Medium**
* 🟠 **High**
* 🔴 **Critical**

---

## 🧰 Technologies

### 🎨 Frontend

* HTML5
* CSS3
* JavaScript
* EJS
* Font Awesome

### ⚙️ Backend

* Node.js
* Express.js

### 🗄️ Database

* MySQL
* MySQL2

### 🔐 Authentication & Configuration

* Express Session
* bcrypt.js
* dotenv

### 🧑‍💻 Development & Deployment

* Visual Studio Code
* Git
* GitHub
* Nodemon
* Render

---

## 📁 Project Structure

```text
NexaDesk/
│
├── 📁 config/
│   └── db.js
│
├── 📁 controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── dashboardController.js
│   ├── pageController.js
│   └── ticketController.js
│
├── 📁 middleware/
│   ├── authMiddleware.js
│   └── flash.js
│
├── 📁 public/
│   ├── 📁 css/
│   └── 📁 js/
│
├── 📁 routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── dashboardRoutes.js
│   ├── pageRoutes.js
│   └── ticketRoutes.js
│
├── 📁 views/
│   ├── 📁 admin/
│   ├── create-ticket.ejs
│   ├── dashboard.ejs
│   ├── error.ejs
│   ├── knowledge-base.ejs
│   ├── login.ejs
│   ├── notifications.ejs
│   ├── profile.ejs
│   ├── register.ejs
│   ├── ticket-details.ejs
│   └── tickets.ejs
│
├── app.js
├── nexadesk.sql
├── package.json
├── package-lock.json
├── .env.example
└── .gitignore
```

---

# 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Ichan-creator/NexaDesk.git
```

### 2. Open the Project Folder

```bash
cd NexaDesk
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create the Environment File

Create a `.env` file in the project root:

```env
PORT=3000

DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=nexadesk
DB_PORT=3306

SESSION_SECRET=your_session_secret
```

> ⚠️ **Do not commit your `.env` file or database credentials to GitHub.**

### 5. Set Up MySQL

Open **MySQL** or **MySQL Workbench** and import:

```text
nexadesk.sql
```

Make sure the database name matches your `DB_NAME`.

---

# ▶️ Run Locally

### Development Mode

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production Mode

```bash
npm start
```

NexaDesk uses:

```js
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`NexaDesk running on port ${PORT}`);
});
```

---

# ☁️ Render Deployment

NexaDesk is configured for deployment as a **Node.js Web Service on Render**.

### Build Command

```bash
npm install
```

### Start Command

```bash
npm start
```

### Environment Variables

Add these variables in Render:

```text
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
DB_PORT
SESSION_SECRET
```

Render automatically provides the `PORT` environment variable.

### Database

A local MySQL server using:

```env
DB_HOST=localhost
```

cannot be accessed by a deployed Render application.

For production, NexaDesk requires a **remote MySQL database**.

---

# 🔐 Security

The following files should not be committed:

```text
.env
node_modules/
```

Your `.gitignore` should contain:

```gitignore
node_modules/
.env
```

Sensitive credentials should be configured through Render's environment variables.

---

# 🌐 Main Pages

### 👤 User

```text
/login
/register
/dashboard
/tickets
/tickets/new
/notifications
/profile
```

### 🛡️ Administrator

```text
/admin/login
/admin
```

---

# 🎯 Project Purpose

NexaDesk demonstrates practical experience with:

* 💻 IT service request management
* 🎫 Ticket management
* 🔐 User authentication
* 👨‍💻 End-user support workflows
* 👥 Administrator account management
* 🗄️ Database integration
* 🌐 Full-stack web development
* 🔄 CRUD operations
* 📊 Dashboard development
* 📱 Responsive interfaces
* 🔗 Backend and frontend integration
* ☁️ Cloud deployment

---

# 🔮 Future Improvements

* 📧 Email notifications
* 📎 File attachments
* 👨‍💻 Ticket assignment to IT support staff
* 📚 Knowledge base management
* 🔎 Advanced ticket filtering
* 📊 Service Desk analytics and reporting
* 🔐 Role-based permissions
* 📈 IT support performance metrics

---

# 👨‍💻 Author

## Christian Aquino

**Bachelor of Science in Information Technology**

NexaDesk was created as a portfolio project to demonstrate practical **IT support, service desk, web development, backend development, and database integration skills**.

---

<p align="center">
  <strong>Built with Node.js • Express.js • EJS • MySQL</strong>
</p>

<p align="center">
  🚀 <strong>Deployed with Render</strong>
</p>
