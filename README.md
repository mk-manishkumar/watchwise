# **Watchwise**

**WatchWise** is a YouTube video duration analyzer that allows users to paste a YouTube video link and view its duration at various playback speeds. It efficiently fetches video metadata and displays formatted durations in a user-friendly interface.


---

## **Deployment**

This project is deployed on `Render` (backend) and `Vercel` (frontend). [Click here](https://watchwise-yt.vercel.app) for live project.

## **Technologies Used**

### **Frontend**
- **React**
- **Custom CSS**

### **Backend**
- **Node.js + Express**
- **YouTube Data API**

---

## **Project Structure**
```plaintext
watchwise/
├── client/               # Frontend folder
│   ├── public/           # Static assets (favicon, etc.)
│   ├── src/              # React components and logic
│   ├── .env              # Frontend environment variables
│   └── vite.config.js    # Vite configuration
├── server.js             # Main backend entry point
├── .env                  # Backend environment variables
├── package.json          # Backend dependencies and scripts
└── README.md             # Project documentation
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
npm start
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

## **Production Build**
To deploy the app:
1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```
2. Serve the frontend using the backend:
   - Configure Express to serve the `client/dist` folder.

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