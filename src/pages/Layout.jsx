import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className="min-h-screen gap-5 flex flex-col bg-gray-100 dark:bg-gray-800">
            <Header />
            <main className='flex-1'>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
