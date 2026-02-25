import React, { useEffect, useState } from 'react'
import { calculateAge } from '../pages/UserList'
import { useDispatch, useSelector } from 'react-redux'
import Modal from './Modal'
import Form from './Form'
import { UserStar, User, Mail, Phone, Mars, Venus, Calendar, Cake } from 'lucide-react'


const Home = () => {
    const activeUser = useSelector(state => state.users.currentUser)
    const currentUser = useSelector(state => state.users.users.find(u => u.email === activeUser.email))
    const user = currentUser?.name
    const isAdmin = activeUser?.role === "admin"
    const admin = useSelector(state => state.users.admin.find(a => a.email === activeUser.email))
    const dispatch = useDispatch()
    // console.log(currentUser)



    const [open, setOpen] = useState(false)
    const handleUpdate = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }



    return (
        <div className='max-w-3xl mx-auto px-4 py-10'>

            <div className='w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 flex-col gap-8'>
                <h1 className='text-center text-5xl font-semibold text-gray-800'>{isAdmin ? `Dashboard` : `Welcome ${user}`}</h1>
                <div className='m-10'>

                    <div className='bg-gray-100 rounded-xl p-6 space-y-4'>
                        <h1 className='text-center text-green-900 mt-2 border-b pb-2'>{isAdmin ? `Admin Details` : `User Details`}</h1>
                        <div className='grid-cols-2 grid  sm:grid-cols-2 gap-4'>
                            <h2
                                className='text-sm font-medium text-gray-500'>
                                <div className='flex gap-0.5'><span className='flex gap-1 items-center'>
                                    {isAdmin ? <UserStar size={18} /> : <User />}Name:</span>
                                    <span className='text-gray-800 font-semibold font-sans truncate max-w-55'>
                                        {isAdmin ? admin.name : currentUser.name}</span>
                                </div>
                            </h2>
                            <h2
                                className='text-md  font-medium text-gray-500'>
                                <div className='flex gap-0.5'><span className='flex gap-1 items-center'>
                                    <Mail size={18} />Email:</span>
                                    <span className='text-gray-800 font-semibold font-sans truncate max-w-55'>
                                        {isAdmin ? admin.email : currentUser.email}</span>
                                </div>
                            </h2>
                            <h2
                                className='text-md font-medium text-gray-500'>
                                <div className='flex gap-0.5'><span className='flex gap-1 items-center'>
                                    <Phone size={18} />Phone:</span>
                                    <span className='text-gray-800 font-semibold font-sans'>
                                        {isAdmin ? admin.phone : currentUser.phone}</span>
                                </div>
                            </h2>
                            <h2
                                className='text-md font-medium text-gray-500'>
                                <div className='flex gap-0.5'><span className='flex gap-1 items-center'>
                                    <Calendar size={18} />DOB:</span>
                                    <span className='text-gray-800 font-semibold font-sans'>
                                        {isAdmin ? admin.dob : currentUser.dob}</span>
                                </div>
                            </h2>
                            <h2
                                className='text-md font-medium text-gray-500'>
                                <div className='flex gap-0.5'><span className='flex gap-1 items-center'>
                                    {(admin?.gender === "male" || currentUser?.gender === "male") ? <Mars size={18} /> : <Venus size={18} />}Gender:</span>
                                    <span className='text-gray-800 font-semibold font-sans'>
                                        {isAdmin ? admin.gender : currentUser.gender}</span>
                                </div>
                            </h2>
                            <h2
                                className='text-md font-medium text-gray-500'>
                                <div className='flex gap-0.5'><span className='flex gap-1 items-center'>
                                    <Cake size={18} />Age:</span>
                                    <span className='text-gray-800 font-semibold font-sans'>
                                        {isAdmin ? calculateAge(admin.dob) : calculateAge(currentUser.dob)}</span>
                                </div>
                            </h2>
                        </div>
                        <div className='w-full flex justify-center'>
                            <button className='px-6 py-2 rounded-md bg-green-800 font-medium text-white hover:bg-green-700 hover:cursor-pointer' onClick={handleUpdate}>Update Details</button>
                        </div>
                    </div>

                </div>
            </div>
            <Modal isOpen={open} onClose={handleClose}>
                <Form user={isAdmin ? admin : currentUser} onClose={handleClose} />
            </Modal>
        </div>

    )
}

export default Home
