import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { endPoints } from "./apis";

export const signUp = async (data, navigate) => {
    try {
        const response = await apiConnector("POST", endPoints.SIGNUP_API, data);
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("User Registered");
        navigate("/login");
    } catch(err) {
        console.log(err);
        toast.error(err?.response.data.message);
        navigate("/signup");
    }
}

export const login = async (data, navigate) => {
    try {
        const response = await apiConnector("POST", endPoints.LOGIN_API, data);
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        localStorage.setItem("token", response?.data?.token);
        const user = JSON.stringify(response?.data?.data);
        localStorage.setItem("user", user);
        toast.success("User Logged In");
        navigate("/dashboard");
    } catch(err) {
        console.log(err);
        // localStorage.setItem("token", null);
        toast.error(err?.response.data.message);
        navigate("/login");
    }
}

export const getSearchUsers = async (token, query) => {
    try {
        const response = await apiConnector("GET", endPoints.SEARCH_USERS_API+query, null, {
            Authorization: `Bearer ${token}`,
        });
        console.log(response.data);
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err) {
        console.log(err);
        toast.error(err.response.data.message);
        throw new Error(err);
    }
}

export const getUserDetails = async (token) => {
    try {
        const response = await apiConnector("GET", endPoints.USER_DETAILS_API, null, {
            Authorization: `Bearer ${token}`,
        });
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.log(err);
        throw new Error(err.message);
    }
}

export const transferMoney = async (data, token, navigate) => {
    try {
        const response = await apiConnector("POST", endPoints.TRANSFER_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log(response);
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(response.data.message);
        navigate("/dashboard");
    } catch(err) {
        console.log(err);
        toast.error(err?.response.data.message);
        throw new Error(err.response.data.message);
    }
}

export const logout = async (navigate) => {
    try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/login");
    } catch(err) {
        console.log(err);
        toast.error(err?.message);
    }
}