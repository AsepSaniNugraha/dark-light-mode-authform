import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertFail from '../modal/AlertFail';
import AlertSuccess from '../modal/AlertSuccess';


const AuthChangePassword = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(null);
    const [respondMessage, setRespondMessage] = useState("");
    const [passwordVisible, setPasswordVisible] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    })
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handlePasswordVisible = (inputField) => {
        setPasswordVisible(prev => ({
            ...prev, [inputField]: !prev[inputField]
        }))
    }

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { currentPassword, newPassword, confirmPassword } = formData;
        const existingUser = JSON.parse(localStorage.getItem("users")) || []
        const loginUser = JSON.parse(localStorage.getItem("loginUser"))
        const userIndex = existingUser.findIndex(
            (user) => user.email === loginUser.email
        )
        if (
            !currentPassword.trim() ||
            !newPassword.trim() ||
            !confirmPassword.trim()
        ) {
            setModal("fail")
            setRespondMessage("Fill all field to proceed")
            return
        }

        if (existingUser[userIndex].password !== currentPassword) {
            setModal("fail")
            setRespondMessage("Incorrect current password")
            return
        }

        if (newPassword !== confirmPassword) {
            setModal("fail")
            setRespondMessage("New password must match with confirm password")
            return
        }

        existingUser[userIndex].password = newPassword
        localStorage.setItem("users", JSON.stringify(existingUser))
        setModal("success")
        setRespondMessage("Password changed sucessfully. You will be directed to login page")
        setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        })
    }

    const confirmChangePassword = () => {
        localStorage.removeItem("loginUser")
        setModal(null)
        navigate("/auth")
    }

    return (
        <div className=" flex flex-col p-10 pt-20 text-text-primary h-screen">
            {modal === "fail" && (
                <AlertFail
                    respondMessage={respondMessage}
                    onClose={() => setModal(null)} />
            )}
            {modal === "success" && (
                <AlertSuccess
                    respondMessage={respondMessage}
                    onClose={() => confirmChangePassword()} />
            )}
            <h1 className='text-4xl  text-center'>
                CHANGE PASSWORD
            </h1>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 py-5 '>
                <div className='flex flex-col gap-2'>
                    <label
                        className='font-semibold'
                        htmlFor='currentPassword'>
                        Current Password
                    </label>
                    <div className='relative'>
                        <input
                            onChange={handleChange}
                            value={formData.currentPassword}
                            className=" text-text-muted w-full py-2 px-3 focus:outline-none border border-border bg-bg-surface rounded-lg"
                            id='currentPassword'
                            name='currentPassword'
                            placeholder="enter currentPassword"
                            type={`${passwordVisible.currentPassword ? "text" : "password"}`}
                            autoComplete='off' />
                        <button
                            onClick={() => handlePasswordVisible("currentPassword")}
                            type='button'
                            className='absolute top-2 right-4 text-text-muted'>
                            <i className={`bi text-2xl ${passwordVisible.currentPassword ? "bi-eye" : "bi-eye-slash"}`}></i>
                        </button>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <label
                        className='font-semibold'
                        htmlFor='newPassword'>
                        New Password
                    </label>
                    <div className='relative'>
                        <input
                            onChange={handleChange}
                            value={formData.newPassword}
                            className=" text-text-muted w-full py-2 px-3 focus:outline-none border border-border bg-bg-surface rounded-lg"
                            id='newPassword'
                            name='newPassword'
                            placeholder="enter your newPassword"
                            type={`${passwordVisible.newPassword ? "text" : "password"}`}
                            autoComplete='off' />
                        <button
                            onClick={() => handlePasswordVisible("newPassword")}
                            type='button'
                            className='absolute top-2 right-4 text-text-muted'>
                            <i className={`bi text-2xl ${passwordVisible.newPassword ? "bi-eye" : "bi-eye-slash"}`}></i>
                        </button>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <label
                        className='font-semibold'
                        htmlFor='confirmPassword'>
                        Confirm Password
                    </label>
                    <div className='relative'>
                        <input
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            className=" text-text-muted w-full py-2 px-3 focus:outline-none border border-border bg-bg-surface rounded-lg"
                            id='confirmPassword'
                            name='confirmPassword'
                            placeholder="enter confirm password"
                            type={`${passwordVisible.confirmPassword ? "text" : "password"}`}
                            autoComplete='off' />
                        <button
                            onClick={() => handlePasswordVisible("confirmPassword")}
                            type='button'
                            className='absolute top-2 right-4 text-text-muted'>
                            <i className={`bi text-2xl ${passwordVisible.confirmPassword ? "bi-eye" : "bi-eye-slash"}`}></i>
                        </button>
                    </div>
                </div>
                <button
                    type='submit'
                    className=' bg-accent py-1 w-2/5 mx-auto hover:w-full rounded-lg transition-all duration-300'>
                    <p className='transition-all duration-300 py-1'>
                        Change
                    </p>
                </button>
            </form>
            <div className='flex flex-col gap-4 text-center justify-end h-full'>
                <Link to="/dashboard"
                    className=' border-2 border-accent hover:bg-accent transition-all duration-300 py-2 px-10 rounded-lg'>
                    Back
                </Link>
            </div>
        </div >
    )
}

export default AuthChangePassword