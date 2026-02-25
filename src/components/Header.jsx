import React, { useEffect } from 'react'
import { Moon, Sun, UsersRound } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, toggleTheme } from '../store/userSlice'

const Header = () => {
    const theme = useSelector(state => state.users.theme)
    const isAuth = useSelector(state => state.users.isAuth)
    const currentUser = useSelector(state => state.users.currentUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logoutUser())
        navigate("/login")
    }

    useEffect(() => {
        const html = document.documentElement;

        if (theme === "dark") {
            html.classList.add("dark")
        } else {
            html.classList.remove("dark")
        }
    }, [theme])
    return (
        <header className='sticky bg-gray-900 text-white shadow-md p-4 flex justify-between items-center dark:bg-red-600'>
            <div className='flex items-center gap-2'>
                <UsersRound color="#ffffff" />
                {isAuth && <h1 className='mx-auto text-2xl font-bold tracking-wide'>User Management</h1>}
            </div>

            <nav className='flex gap-6 me-5 items-center'>
                <NavLink
                    to="register"
                    className={({ isActive }) =>
                        `transition-colors duration-200 ${isActive
                            ? "text-yellow-400 font-semibold border-b-2 border-yellow-400"
                            : "hover:text-yellow-300"
                        }`
                    }
                >
                    {isAuth ? " Home" : "Register"}
                </NavLink>
                {(currentUser?.role === "admin" || !currentUser) &&
                    <NavLink
                        to={isAuth ? "users" : "login"}
                        className={({ isActive }) =>
                            `transition-colors duration-200 ${isActive
                                ? "text-yellow-400 font-semibold border-b-2 border-yellow-400"
                                : "hover:text-yellow-300"
                            }`
                        }
                    >
                        {isAuth ? "Users" : "Login"}
                    </NavLink>}
                {isAuth && <button onClick={handleLogout}
                    className='hover:cursor-pointer dark:bg-gray-900 px-4 py-2 bg-amber-800 text-white font-semibold rounded-md'>Logout</button>}

                <button onClick={() => dispatch(toggleTheme())}
                    className='px-2 py-2  rounded-lg bg-white dark:bg-gray-800  shadow-sm transition hover:cursor-pointer'>
                    {theme === "light" ? <Moon size={20} color='black' /> : <Sun size={20} color='#fafafa' />}</button>
            </nav>
        </header>
    )
}

export default Header
