import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./routes/Router";
import Layout from "./layout/Layout";
import UserProvider from "./users/providers/UserProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ וידוא טעינת הסטיילים של toastify
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./providers/ThemeProvider";

function App() {
  
  return (
    <BrowserRouter>
      <ThemeProvider>
      <ScrollToTop />
      <UserProvider>
   
          <Layout>
            <Router />
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
          </Layout>
  
      </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}


export default App;
