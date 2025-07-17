# **Watchwise**

**WatchWise** is a YouTube video duration analyzer that allows users to paste a YouTube video link and view its duration at various playback speeds. It efficiently fetches video metadata and displays formatted durations in a user-friendly interface.


---

## **Deployment**

This project is deployed on and `Vercel` . [Click here](https://watchwise-yt.vercel.app) for live project.

## **Technologies Used**

### **Frontend**
- **React**
- **Tailwind CSS**

### **Backend**
- **Node.js + Express**
- **YouTube Data API**

---

## **Project Structure**
```plaintext
watchwise/
├── api/                          # Backend folder
│   ├── .env                      # Backend environment variables
│   ├── .env.sample               # Sample backend env file
│   ├── .gitignore                # Git ignored files for backend
│   ├── package.json              # Backend dependencies and scripts
│   ├── package-lock.json         # Backend lockfile
│   ├── server.js                 # Express backend entry point
│   └── vercel.json               # Vercel backend config
│
├── ui/                           # Frontend folder
│   ├── src/                      # React source files
│   │   ├── assets/               # Static assets (images, etc.)
│   │   ├── components/           # React components
│   │   ├── App.jsx               # Main App component
│   │   ├── App.css               # App-specific styles
│   │   ├── index.css             # Global styles
│   │   └── main.jsx              # Entry point for React
│   ├── .env                      # Frontend environment variables
│   ├── .env.sample               # Sample frontend env file
│   ├── .gitignore                # Git ignored files for frontend
│   ├── eslint.config.js          # ESLint configuration
│   ├── index.html                # HTML template
│   ├── package.json              # Frontend dependencies and scripts
│   ├── package-lock.json         # Frontend lockfile
│   └── vite.config.js            # Vite configuration

```

---

## **Getting Started**

### **1. Prerequisites**
Ensure the following software is installed on your machine:
- **Node.js** (v16+ recommended)
- **npm** (or **yarn**)

### **2. Installation**
Clone the repository:
```bash
git clone https://github.com/your-username/watchwise.git
cd watchwise
```

Install dependencies:
```bash
# Backend dependencies
npm install

# Frontend dependencies
cd client
npm install
```

---

## **Environment Variables**
Create `.env` files for both the backend and frontend based on the provided `.env.sample`.  

### Backend `.env` example:
```env
PORT=5000 (example)
YOUTUBE_API_KEY=""
ALLOWED_ORIGIN=""
```

### Frontend `.env` example (`client/.env`):
```env
VITE_API_BASE_URL=""
```

---

## **Running the Application**

### **1. Backend**
Start the backend server:
```bash
npm run dev
```
The backend will run on `http://localhost:5000`.

### **2. Frontend**
Start the frontend development server:
```bash
cd client
npm run dev
```
The frontend will run on `http://localhost:5173`.

---

## **API Endpoints**
| **Method** | **Endpoint**              | **Description**             |
| ---------- | ------------------------- | --------------------------- |
| `GET`      | `/api/video-details?url=` | Fetch YouTube video details |

**Example:**
```bash
GET http://localhost:5000/api/video-details?url=https://www.youtube.com/watch?v=exampleID
```

---

## **Error Handling**
- **Invalid URL**: Ensures that only valid YouTube URLs are processed.


---


---

## **Contributing**
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Added feature-name"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## **License**
This project is licensed under the **MIT License**. See `LICENSE` for more details.

---

## **Contact**

If you have any queries mail me at `manish.login01@gmail.com` or ping me on [Twitter/X](https://x.com/_manishmk).