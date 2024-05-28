import { useState } from "react";
import { signUp } from "../services/operations";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        console.log(user);
        setLoading(true);
        await signUp(user, navigate);
        setLoading(false);
    }

	return (
        <div className="w-[400px] mx-auto border mt-12 py-5 rounded-2xl border-black shadow-xl flex flex-col p-5">
            <p className="text-center text-3xl font-bold mb-6">SignUp</p>
            <div className="flex flex-col gap-3">
                <div>
                    <p className="text-lg ml-1">Name</p>
                    <input
                        placeholder="Enter Full Name"
                        name="name"
                        id="name"
                        type="text"
                        className="text-lg border w-full p-2 rounded"
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value})}
                    />
                </div>
                <div>
                    <p className="text-lg ml-1">Username</p>
                    <input
                        placeholder="Enter Unique Username"
                        name="username"
                        id="username"
                        type="text"
                        className="text-lg border w-full p-2 rounded"
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                    />
                </div>
                <div>
                    <p className="text-lg ml-1">Mobile No.</p>
                    <input
                        placeholder="Enter Mobile Number"
                        name="mobile"
                        id="mobile"
                        type="tel"
                        className="text-lg border w-full p-2 rounded"
                        value={user.mobileNo}
                        onChange={(e) => setUser({...user, mobileNo: e.target.value})}
                    />
                </div>
                <div>
                    <p className="text-lg ml-1">Email</p>
                    <input
                        placeholder="Enter your Email"
                        name="email"
                        id="email"
                        type="email"
                        className="text-lg border w-full p-2 rounded"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                </div>
                <div>
                    <p className="text-lg ml-1">Password</p>
                    <input
                        placeholder="Enter Password"
                        name="password"
                        id="password"
                        type="password"
                        className="text-lg border w-full p-2 rounded"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />
                </div>
            </div>
            <button
                className="p-2 px-3 rounded-md hover:bg-slate-800 bg-black text-white mt-6 text-lg font-medium"
                onClick={handleSubmit}
            >
                {
                    loading ? <p>Signing Up...</p> : <p>SignUp</p>
                }
            </button>
        </div>
    );
}

export default Signup;