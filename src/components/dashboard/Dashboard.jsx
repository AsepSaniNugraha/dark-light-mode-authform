import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AlertLogout from '../modal/AlertLogout';

const Dashboard = () => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"))
    const loginName = loginUser.name;
    const navigate = useNavigate();
    const [modal, setModal] = useState(null);
    const [respondMessage, setRespondMessage] = useState(null);

    const handleLogout = () => {
        setModal("logout")
        setRespondMessage("Are you sure want to logout?")
    }
    const confirmLogout = () => {
        localStorage.removeItem("loginUser")
        navigate("../")
    }
    return (
        <div className='flex flex-col h-screen items-center py-10 text-text-primary'>
            {modal === "logout" && (
                <AlertLogout
                    respondMessage={respondMessage}
                    onCancel={() => setModal(null)}
                    onProceed={() => confirmLogout()} />
            )}
            <div className='flex-1 flex items-center justify-center'>
                <div className='text-center'>
                    <p className=' text-2xl'>
                        Welcome back, <span>{loginName}</span>
                    </p>
                    <p className=' text-lg'>
                        What do you want to do today?
                    </p>
                </div>
            </div>
            <div className='flex flex-col gap-4 text-center'>
                <button
                    onClick={handleLogout}
                    className=' border-2 border-accent bg-accent hover:bg-transparent transition-all duration-300 py-2 px-10 rounded-lg'>
                    Log Out
                </button>
                <Link to="../auth/changepassword"
                    className=' border-2 border-accent hover:bg-accent transition-all duration-300 py-2 px-10 rounded-lg'>
                    Change Password
                </Link>
            </div>

        </div>
    )
}

export default Dashboard