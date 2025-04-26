# EventManagerClient

React-based client application for managing events, suppliers, and user interactions.

## 🚀 Project Overview

**EventManagerClient** is the front-end application of the Event Manager system.
It allows users to manage events and suppliers through an intuitive and user-friendly interface.

Main features:
- Create, view, edit, and delete (CRUD) events.
- Create, view, edit, and delete (CRUD) suppliers.
- Mark suppliers as favorites.
- Assign suppliers to specific events.
- Responsive design for mobile and desktop.
- Real-time interactions with the server.

The client communicates with the server-side ASP.NET Core Web API (**EventManagerServerApi**) to store and retrieve data.

---

## ⚙️ How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/yaron-yunayev/EventManagerClient.git
cd EventManagerClient
```

### 2. Install dependencies

Make sure you have Node.js and npm installed. Then run:

```bash
npm install
```

This will install all required dependencies.

---

### 3. Environment Configuration (Recommended)

This client requires connection to a backend API.
You can configure the API URL through environment variables.

Create a file named `.env` in the root folder:

```env
REACT_APP_API_URL=https://localhost:5001/api
```

> ✅ **Note:**
> - `REACT_APP_API_URL` should match the base URL of your ASP.NET Core server.
> - In production, you can replace it with your production server URL.

The code automatically uses the value from `REACT_APP_API_URL` to connect to the API endpoints.

---

### 4. Run the Development Server

```bash
npm start
```

This will start the app in development mode.

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- The page will reload automatically when you make changes.

---

## 🛡️ Important Notes

- The `node_modules` and `build` folders are ignored via `.gitignore` and are not uploaded to GitHub.
- `.env` files are used for local environment configurations and should not be committed.
- The client automatically fetches data from the server specified in `REACT_APP_API_URL`.

---

## 📦 Technologies Used

- React 18
- React Router DOM
- Axios
- Tailwind CSS (optional)
- Context API / Redux
- Vite / Create React App

---

## 🧹 Folder Structure

```bash
src/
 ├── components/    # Reusable UI components
 ├── pages/         # Pages corresponding to routes
 ├── services/      # API service files
 ├── providers/       # React Context Providers
 ├── App.jsx        # Main app component
 └── index.jsx      # Entry point
public/             # Static files
.gitignore
package.json        # Project metadata and dependencies
README.md           # Project documentation
```

---

## ✨ Author

Developed by [Yaron Yunayev](https://github.com/yaron-yunayev).

---

## 🔗 Backend Connection

This project is connected to the ASP.NET Core Web API server:

- Server repository: [EventMangerServerApi](https://github.com/yaron-yunayev/EventMangerServerApi)
- API endpoints are dynamically loaded from the environment variable `REACT_APP_API_URL`.

Make sure the server is running locally or is accessible online to allow full functionality of the client application.

---

## 📅 Future Improvements

- Add authentication (JWT login).
- Improve mobile responsiveness.
- Add real-time updates with WebSockets.
- Add role-based access control (admin, event manager, user).

