import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Services from "../Pages/Services";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Logout from "../Pages/Logout";
import Navbar from "../Navigation/Navbar";
import ErrorPage from "../Pages/ErrorPage";
import Admin from "../Pages/Admin";
import AdminUsers from "../Pages/AdminUsers";
import AdminContacts from "../Pages/AdminContacts";
import AdminUpdate from "../Pages/AdminUpdate";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/admin" element={<Admin />}>
            <Route path="users" element={<AdminUsers />}></Route>
            <Route path="contacts" element={<AdminContacts />}></Route>
            <Route path=":id/" element={<AdminUpdate />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
