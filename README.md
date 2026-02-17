<div align="center">

# 🎯 AI-Powered Resume Builder

### *Create Professional Resumes in Minutes with AI*

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.13+-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://www.javascript.com/)


*A full-stack web application that leverages AI to generate professional, ATS-friendly resumes.*

[Getting Started](#-installation) • [Features](#-features) • [Tech Stack](#-tech-stack) • [API Docs](#-api-endpoints) • [Contributing](#-contributing)

---

</div>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 Authentication
- Secure JWT-based authentication
- Encrypted password storage
- Session management

### 🤖 AI Generation
- Smart content creation with Together API
- ATS-optimized content
- Professional language suggestions

</td>
<td width="50%">

### 🎨 Templates & Editing
- Multiple professional templates
- Live preview & real-time editing
- Drag & drop section management

### 💾 Save & Export
- Cloud storage in MongoDB
- High-quality PDF generation
- Manage multiple resume versions

</td>
</tr>
</table>

## 🛠 Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge) |
| **Authentication** | ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white) ![bcrypt](https://img.shields.io/badge/bcrypt-4B8BBE?style=for-the-badge) |
| **AI & PDF** | ![Together AI](https://img.shields.io/badge/Together_AI-5C3EE8?style=for-the-badge) ![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white) |
| **Frontend** | ![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) |

</div>

## 🚀 Installation

### 📋 Prerequisites

```bash
✓ Node.js (v18 or higher)
✓ MongoDB (Local or Atlas)
✓ Together API Key
✓ Git
```

### ⚙️ Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/prv05/AI-Powered-Resume-Builder.git
   cd AI-Powered-Resume-Builder/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file in backend directory**
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   TOGETHER_API_KEY=your_together_api_key
   ```

4. **Start MongoDB**
   ```bash
   # Windows
   net start MongoDB
   
   # Linux
   sudo systemctl start mongod
   
   # Mac
   brew services start mongodb-community
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Open your browser**
   ```
   http://localhost:5000
   ```

## 📁 Project Structure

```
backend/
├── components/          # Reusable components
├── config/             # Database configuration
├── controllers/        # Route controllers
├── models/             # Mongoose models (User, Template)
├── public/             # Static files (CSS, images)
├── routes/             # API routes
├── services/           # Business logic
├── views/              # EJS templates
├── server.js           # Main application file
└── package.json        # Dependencies
```

## 📡 API Endpoints

<details>
<summary><b>🔐 Authentication Endpoints</b></summary>
<br>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | User login |

</details>

<details>
<summary><b>📝 Resume Operations</b></summary>
<br>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/generate-resume` | Generate resume with AI |
| `POST` | `/save-as-template` | Save resume template |
| `GET` | `/get-templates?username=<username>` | Get user's saved templates |
| `DELETE` | `/delete-template/:id` | Delete a template |
| `POST` | `/download-pdf` | Download resume as PDF |

</details>

## 💡 Usage

<div align="center">

```mermaid
graph LR
    A[🔐 Sign Up] --> B[📝 Create Resume]
    B --> C[🤖 AI Generate]
    C --> D[🎨 Select Template]
    D --> E[✏️ Edit & Preview]
    E --> F[💾 Save]
    F --> G[📄 Download PDF]
    style A fill:#e1f5ff
    style C fill:#fff4e1
    style G fill:#e8f5e9
```

</div>

### Step-by-Step Guide

| Step | Action | Description |
|------|--------|-------------|
| 1️⃣ | **Sign Up** | Create an account with email and password |
| 2️⃣ | **Login** | Access your personalized dashboard |
| 3️⃣ | **Create** | Fill in your details or use AI generation |
| 4️⃣ | **Choose** | Select from professional templates |
| 5️⃣ | **Edit** | Customize with live preview |
| 6️⃣ | **Save** | Store for future edits |
| 7️⃣ | **Export** | Download as high-quality PDF |

## 🔑 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|--------|
| `PORT` | Server port number | ❌ | `5000` |
| `MONGO_URI` | MongoDB connection string | ✅ | - |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ | - |
| `TOGETHER_API_KEY` | Together AI API key | ✅ | - |

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

<div align="center">

### How to Contribute?

</div>

```bash
# 1. Fork the Project
# 2. Clone your fork
git clone https://github.com/your-username/AI-Powered-Resume-Builder.git

# 3. Create your Feature Branch
git checkout -b feature/AmazingFeature

# 4. Commit your Changes
git commit -m 'Add some AmazingFeature'

# 5. Push to the Branch
git push origin feature/AmazingFeature

# 6. Open a Pull Request
```

<div align="center">

### 💡 Contribution Ideas

🎨 New Templates • 🌍 Internationalization • 📱 Mobile App • 🧪 Testing • 📚 Documentation

</div>

---

## 📞 Contact & Support

<div align="center">

**Project Maintainer:** [@prv05](https://github.com/prv05)

**Repository:** [github.com/prv05/AI-Powered-Resume-Builder](https://github.com/prv05/AI-Powered-Resume-Builder)

[![GitHub Issues](https://img.shields.io/badge/Report-Issue-red?style=for-the-badge&logo=github)](https://github.com/prv05/AI-Powered-Resume-Builder/issues)
[![GitHub Discussions](https://img.shields.io/badge/Join-Discussion-blue?style=for-the-badge&logo=github)](https://github.com/prv05/AI-Powered-Resume-Builder/discussions)

</div>

---

## 🙏 Acknowledgments

<div align="center">

| Technology | Purpose |
|------------|--------|
| [**Together AI**](https://www.together.ai/) | 🤖 AI-powered content generation |
| [**MongoDB**](https://www.mongodb.com/) | 🗄️ Database solution |
| [**Express.js**](https://expressjs.com/) | 🚀 Web framework |
| [**Puppeteer**](https://pptr.dev/) | 📄 PDF generation |
| [**EJS**](https://ejs.co/) | 🎨 Template engine |

</div>

---

<div align="center">

### Made with ❤️ for developers worldwide

**If you found this project helpful, consider giving it a ⭐**

[⬆ Back to Top](#-ai-powered-resume-builder)

</div>
