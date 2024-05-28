import { useEffect, useState } from "react";
import { getUserDetails, logout } from "../services/operations";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png"

function Navbar() {
    const token = localStorage.getItem("token");
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const currURL = location.pathname;

    const getUser = async () => {
        const response = await getUserDetails(token);
        console.log(response);
        setUser(response?.data);
    }
    const logoutHandler = async () => {
        await logout(navigate);
    }
    useEffect(() => {
        getUser();
    }, [currURL]);

	return (
        <div className="flex shadow-md p-2 top-0 sticky items-center justify-between px-5 md:px-20">
            <div className="">
                <Link to={"/"}>
                    <img className="h-14" src={Logo}/>
                </Link>
            </div>
            {
                token ? (
                    <div className="flex gap-5 items-center">
                        <p className="text-lg font-normal underline">{user?.name}</p>
                        <p className="text-lg font-normal underline">₹{user?.account?.balance}</p>
                        <button 
                            onClick={logoutHandler}
                            className="p-2 px-3 rounded-md hover:bg-slate-800 bg-black text-white font-medium"
                        >Logout</button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <div>
                            <Link
                                className="border p-2 px-3 rounded-md hover:bg-[#3f62c0] bg-[#1E40AF] text-white font-medium"
                                to={"https://krishnavamshi-portfolio.netlify.app/"}
                                target="_blank"
                            >
                                About
                            </Link>
                        </div>
                        <div>
                            {
                                currURL==="/signup" && (
                                    <Link
                                        className="p-2 px-3 rounded-md hover:bg-slate-800 bg-black text-white font-medium"
                                        to={"/login"}
                                    >LogIn</Link>
                                )
                            }
                            {
                                (currURL==="/login" || currURL==="/") && (
                                    <Link
                                        className="p-2 px-3 rounded-md hover:bg-slate-800 bg-black text-white font-medium"
                                        to={"/signup"}
                                    >SignUp</Link>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Navbar;