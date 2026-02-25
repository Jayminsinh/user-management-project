import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff } from "lucide-react"
import { loginUser } from "../store/userSlice";
import Formfield from '../components/Formfield'
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
    const users = useSelector(state => state.users.users);
    const admins = useSelector(state => state.users.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [showPass, setShowPass] = useState(false)

    const [error, setError] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginData(prev => ({
            ...prev,
            [name]: value
        }))

        setError(prev => ({
            ...prev,
            [name]: ""
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const founduser = users.find(user => user.email === loginData.email && user.password === loginData.password);
        const founAdmin = admins.find(admin => admin.email === loginData.email && admin.password === loginData.password)

        if (founduser || founAdmin) {
            dispatch(loginUser(founduser || founAdmin))
            navigate("/register")
        } else {
            setError({
                email: "Inavalid Email or password",
                password: "Inavalid Email or password"
            })
        }


    }

    return (
        <div className="flex justify-center m-5 p-5 ">
            <form onSubmit={handleSubmit} className="w-md bg-white p-5 rounded-xl shadow-2xl">
                <h2 className="text-center text-2xl font-bold font-serif text-shadow-2xl mb-3 border-b">Login Here</h2>

                <Formfield
                    label="Email*"
                    name="email"
                    type="email"
                    value={loginData.email}
                    error={error.email}
                    onChange={handleChange}
                    placeholder="abcd@xyz.com"
                />

                <Formfield label="Password*" error={error.password}>
                    <div className='relative'>
                        <input
                            name="password"
                            type={showPass ? "text" : "password"}
                            value={loginData.password}
                            onChange={handleChange}
                            placeholder="abc@12"
                            className={`w-full rounded-md border px-3 py-2 text-sm
                     ${error.password ?
                                    "border-red-400 focus:border-red-400"
                                    : "border-gray-300 focus:border-gray-500"
                                }`}
                        />
                        <button type='button' className='hover:cursor-pointer opacity-70 absolute inset-y-0 right-2 flex items-center' onClick={() => setShowPass((p) => !p)}>{showPass ? <Eye size={16} /> : <EyeOff size={16} />}</button>

                    </div>
                </Formfield>
                <button className="w-full py-2 bg-green-950 text-white font-medium hover:cursor-pointer" type="submit">Login</button>
                <p className="m-1 text-sm text-center">Haven't register? <NavLink className=" text-blue-400 hover:text-blue-600 hover:underline" to="/register">Register here</NavLink></p>
            </form>
        </div>
    )
}



export default Login;