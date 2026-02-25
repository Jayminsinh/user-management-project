import React, { use, useEffect, useState } from 'react'
import Formfield from './Formfield'
import { validate } from '../utils/validators'
import { Eye } from "lucide-react";
import { EyeOff, UserRound } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser } from '../store/userSlice';
import { addAdmin, updateAdmin } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
// import { Slide, toast } from 'react-toastify';
import { toast } from 'sonner';


const Form = ({ user, onClose }) => {

    const activeUser = useSelector(state => state.users?.currentUser)
    const isAdmin = activeUser?.role === "admin"
    const isadminDetails = user?.email === activeUser?.email

    const initialValue = {
        name: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
        dob: "",
        gender: "male",
        role: "user",
        terms: false
    }

    const inputRules = {
        name: /^[a-zA-z\s]*$/,
        phone: /^\d*$/,
    }
    // Form Dataaa
    const [formData, setFormData] = useState(initialValue)
    useEffect(() => {
        if (user) {
            setFormData(user)
        }
    }, [user]);

    const [error, setError] = useState({})

    const users = useSelector(state => state.users.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleChange(e) {
        const { name, value, type, checked } = e.target

        if (inputRules[name] && !inputRules[name].test(value)) return;

        const updateFormData = {
            ...formData,
            [name]: type === "checkbox" ? checked : value
        }

        setFormData(updateFormData)

        const validationErrors = validate(updateFormData, users, user?.email)

        setError((prevErr) => ({
            ...prevErr,
            [name]: validationErrors[name] || undefined
        }))



    }

    async function handleSubmit(e) {
        e.preventDefault()

        const validationErrors = validate(formData, users, user?.email, isAdmin);
        setError(validationErrors)

        if (Object.keys(validationErrors).length > 0) return;

        if (user) {
            if (user.role === "admin") {
                dispatch(
                    updateAdmin({
                        email: user.email,
                        updatedData: {
                            name: formData.name.replace(/\s+/g, " "),
                            phone: formData.phone,
                            dob: formData.dob,
                            password: formData.password,
                            gender: formData.gender,
                            role: formData.role
                        }
                    })
                )
                    onClose();
                toast.success('Admin updated Successfully')
            } else {
                const result = await dispatch(
                    updateUser({
                        id: user.id,
                        name: formData.name.replace(/\s+/g, " "),
                        email: user.email,
                        phone: formData.phone,
                        dob: formData.dob,
                        password: formData.password,
                        gender: formData.gender,
                        role: formData.role

                    })
                );
                if (updateUser.fulfilled.match(result)) {
                    toast.success('User updated Successfully')
                    onClose();
                }
            }
            // toast.success('User updated Successfully', {
            //     position: "bottom-center",
            //     autoClose: 1500,
            //     hideProgressBar: false,
            //     closeOnClick: false,
            //     pauseOnHover: true,
            //     draggable: false,
            //     progress: undefined,
            //     theme: "dark",
            //     transition: Slide,
            // });
        } else {
            if (formData.role === "admin") {
                dispatch(
                    addAdmin({
                        name: formData.name.replace(/\s+/g, " "),
                        email: formData.email,
                        phone: formData.phone,
                        dob: formData.dob,
                        password: formData.password,
                        gender: formData.gender,
                        role: formData.role
                    })
                )
                setFormData(initialValue)
                navigate("/login")
                toast.success('Registered Successfully')
            } else {
                const result = await dispatch(
                    addUser({
                        name: formData.name.replace(/\s+/g, " "),
                        email: formData.email,
                        phone: formData.phone,
                        dob: formData.dob,
                        password: formData.password,
                        gender: formData.gender,
                        role: formData.role
                    }))
                if (addUser.fulfilled.match(result)) {
                    toast.success('Registered Successfully')
                    setFormData(initialValue)
                    navigate("/login")
                }
            }
        }

    }

    // SHOW OR HIDE PASSWORD    

    const [showPass, setShowPass] = useState(false)
    const [showConfPass, setShowConfPass] = useState(false)

    return (
        <form onSubmit={handleSubmit} className='bg-white w-md p-5 shadow-2xl rounded-lg '>
            <Formfield
                label="Name*"
                name="name"
                value={formData.name}
                error={error.name}
                onChange={handleChange}
                inputMode="text"
                placeholder="eg.,Virat Kohli"

            />

            <Formfield
                label="Email*"
                name="email"
                type="email"
                value={formData.email}
                error={error.email}
                onChange={handleChange}
                disabled={!!user}
                placeholder="abcd@xyz.com"
            />

            <Formfield
                label="Phone Number*"
                name="phone"
                type="tel"
                value={formData.phone}
                error={error.phone}
                onChange={handleChange}
                maxLength={10}
                placeholder="1234567890"
            />

            <Formfield
                label="Date of Birth*"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                error={error.dob}
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}


            />

            {(!user || !isAdmin || isadminDetails) && <Formfield label="Password*" error={error.password}>
                <div className='relative'>
                    <input
                        name="password"
                        type={showPass ? "text" : "password"}
                        value={formData.password}
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
            </Formfield>}

            {(!user) && <Formfield label="Confirm Password*" error={error.cpassword}>
                <div className='relative'>
                    <input
                        name="cpassword"
                        type={showConfPass ? "text" : "password"}
                        value={formData.cpassword}
                        onChange={handleChange}
                        placeholder="abc@12"
                        className={`w-full rounded-md border px-3 py-2 text-sm
                     ${error.cpassword ?
                                "border-red-400 focus:border-red-400"
                                : "border-gray-300 focus:border-gray-500"
                            }`}
                    />
                    <button type='button' className='hover:cursor-pointer opacity-70 absolute inset-y-0 right-2 flex items-center' onClick={() => setShowConfPass((p) => !p)}>{showConfPass ? <Eye size={16} /> : <EyeOff size={16} />}</button>
                </div>
            </Formfield>}

            {/* <Formfield
                label="Address"
                name="address"
                value={formData.address}
                error={error.address}
                onChange={handleChange}
            >
                <textarea
                    style={{ resize: 'none' }}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    cols="30"
                    className="w-full rounded-md border border-gray-300  px-2 py-2 text-sm"
                    placeholder="Street, City, State, Pincode"
                />
            </Formfield> */}


            <div className='flex w-full items-center'>
                <Formfield label="Gender*" error={error.gender} className="w-3xs">
                    <div className="flex gap-1 ">
                        <label className='flex items-center gap-1 text-sm'>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === "male"}
                                onChange={handleChange}
                            />
                            Male
                        </label>

                        <label className='flex items-center gap-1 text-sm'>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === "female"}
                                onChange={handleChange}
                            />
                            Female
                        </label>
                    </div>
                </Formfield>
                {(!user || isAdmin) && <Formfield label="Role" className="flex items-center">
                    <select
                        name='role'
                        value={formData.role}
                        onChange={handleChange}
                        className='ml-2 w-full rounded-md border border-gray-300 px-3 py-1 text-sm'>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </Formfield>}
            </div>


            {!user && <Formfield error={error.terms} className="text-center">
                <div className='flex justify-center'>
                    <label className='flex items-center gap-2 font-medium'>
                        <input
                            className='accent-blue-600'
                            type="checkbox"
                            name='terms'
                            checked={formData.terms}
                            onChange={handleChange}
                        />
                        Accept Terms & Condition
                    </label>
                </div>
            </Formfield>}


            <button type='submit'
                className='w-full py-2 bg-blue-700 text-white font-semibold rounded-sm hover:cursor-pointer hover:bg-blue-600'
            >{user ? "Update" : "Register"}
            </button>


        </form>
    )
}

export default Form
