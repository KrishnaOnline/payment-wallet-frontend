import { useEffect, useState } from "react";
import { getSearchUsers } from "../services/operations";
import { Link } from "react-router-dom";

function Dashboard() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Token from Dahsboard:", token);
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState(null);
    const handleSearch = async (token) => {
        const response = await getSearchUsers(token, !query ? "" : query);
        console.log("Search Users Response: ", response?.data);
        setUsers(response?.data);
    }
    useEffect(() => {
        handleSearch(token);
    }, []);

	return (
        <div className="p-5">
            <div>
                <p className="text-3xl font-bold mt-4 mb-2">Your Balance: <span>₹{user.account.balance}</span></p>
            </div>
            <div className="flex items-center gap-1 mb-7">
                <input
                    placeholder="Search Users by Name, Username or MobileNo's..."
                    id="users"
                    className="text-lg border border-black w-full p-2 rounded mt-6"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className="p-2 px-3 rounded-md hover:bg-slate-800 bg-black text-white mt-6 text-lg font-medium"
                >Search</button>
            </div>
            <div className="">
                {
                    users.length 
                    ? 
                    users?.map((u, index) => {
                        return u._id!==user._id && (
                            <div key={index} className="border p-3 rounded-lg px-5 shadow-md flex justify-between items-center text-xl">
                                <div>
                                    <p>► {u?.name}</p>
                                    <p className="pl-5 text-base text-gray-500">Username: {u?.username}</p>
                                    <p className="pl-5 text-base text-gray-500">Mobile: {u?.mobileNo}</p>
                                </div>
                                <div>
                                    <Link to={`/transfer/${u._id}`} className="p-2 px-3 rounded-md hover:bg-slate-800 bg-black text-white mt-6 text-lg font-medium">
                                        Send Money
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="text-2xl font-medium text-center mt-9">No Users Found !!!</div>
                }
            </div>
        </div>
    );
}

export default Dashboard;
