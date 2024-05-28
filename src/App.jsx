import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Transfer from "./components/Transfer";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";

function App() {
    const token = localStorage.getItem("token");
    console.log(token);
    
	return (
		<div className="">
            <BrowserRouter>
                <Navbar/>
                <div className="max-w-[1280px] mx-auto">
                    <Routes>
                        <Route path="/signup" element={<Signup/>}/>
                        {
                            token ? <Route path="/" element={<Dashboard/>}/>
                                  : <Route path="/" element={<Login/>}/>
                        }
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/transfer/:receiverID" element={<Transfer/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
            <Toaster/>
        </div>
	);
}

export default App;