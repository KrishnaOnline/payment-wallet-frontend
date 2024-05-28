import { useNavigate, useParams } from "react-router-dom";
import { transferMoney } from "../services/operations";
import { useState } from "react";

function Transfer() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const {receiverID} = useParams();
    const navigate = useNavigate();
    console.log(user);
    const [data, setData] = useState({to: receiverID});
    const [loading, setLoading] = useState(false);
    // setData({...data, to: receiverID});

    const handleTransfer = async () => {
        setLoading(true);
        await transferMoney(data, token, navigate);
        setLoading(false);
    }
    
	return (
        <div className="w-[400px] mx-auto border mt-12 py-5 rounded-2xl border-black shadow-xl flex justify-center translate-y-20 flex-col p-5">
            <p className="text-center text-3xl font-bold mb-6">Transaction</p>
            {/* <p>Me: {user?._id}</p>
            <p>Rec: {receiverID}</p> */}
            <div className="">
                <div className="flex items-center">
                    <p className="text-2xl mr-3">₹</p>
                    <input
                        placeholder="Enter Amount"
                        // value={data.amount}
                        className="text-lg border w-full p-2 rounded"
                        onChange={(e) => setData({...data, amount: e.target.value})}
                    />
                </div>
                <button
                    className="p-2 px-3 w-full rounded-md hover:bg-slate-800 bg-black text-white mt-6 text-lg font-medium"
                    onClick={handleTransfer}
                >
                    {
                        loading ? "Sending..." : "Send Money"
                    }
                </button>
            </div>
        </div>
    );
}

export default Transfer;
