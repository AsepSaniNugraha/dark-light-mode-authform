import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div className='sm:max-w-1/2 md:max-w-1/2 lg:max-w-1/3 mx-auto shadow-2xl shadow-text-primary h-screen'>
            <Outlet />
        </div>
    )
}

export default AuthLayout