import { useState } from "react";
import { login } from "../services/operations";
import { useNavigate } from "react-router-dom";

function Login() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        console.log(user);
        setLoading(true);
        const response = await login(user, navigate);
        console.log(response?.data?.token);
        setLoading(false);
    }

	return (
        <div className="w-[400px] mx-auto border mt-12 py-5 rounded-2xl border-black shadow-xl flex flex-col p-5">
            <p className="text-center text-3xl font-bold mb-6">Login</p>
            <div className="flex flex-col gap-3">
                <div>
                    <p className="text-lg ml-1">Username</p>
                    <input
                        placeholder="Enter your Username"
                        name="username"
                        id="username"
                        type="text"
                        className="text-lg border w-full p-2 rounded"
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
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
                    loading ? <p>Logging In...</p> : <p>Login</p>
                }
            </button>
        </div>
    );
}

export default Login;