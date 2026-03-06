import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AlertFail from '../modal/AlertFail';
import AlertSuccess from '../modal/AlertSuccess';

const AuthRegister = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(null);
    const [respondMessage, setRespondMessage] = useState();
    const [passwordVisible, setPasswordVisible] = useState({
        password: false,
        confirmPassword: false
    });
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handlePasswordVisible = (inputField) => {
        setPasswordVisible(prev => ({
            ...prev, [inputField]: !prev[inputField]
        }))
    };

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { fullName, email, password, confirmPassword } = formData
        if (!fullName || !email || !password || !confirmPassword) {
            setModal("fail")
            setRespondMessage("All field must be filled")
            return
        }
        if (password !== confirmPassword) {
            setModal("fail")
            setRespondMessage("Password and Confirm Password must be matched")
            return
        }
        const existingUser = JSON.parse(localStorage.getItem("users")) || []
        const foundUser = existingUser.find(
            (user) => user.email.toLowerCase() === email.toLowerCase()
        )
        if (foundUser) {
            setModal("fail")
            setRespondMessage("The email has been registered")
            return
        }
        const updateUsers = [...existingUser, { fullName, email, password }];
        localStorage.setItem("users", JSON.stringify(updateUsers));
        setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
        setModal("success")
        setRespondMessage("Registration completed")
        return
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
                    onClose={() => {
                        setModal(null)
                        navigate("/auth")
                    }} />
            )}
            <h1 className='text-4xl  text-center'>
                REGISTER
            </h1>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 py-5 '>
                <div className='flex flex-col gap-2'>
                    <label
                        className='font-semibold'
                        htmlFor='fullName'>
                        Full Name
                    </label>
                    <input
                        onChange={handleChange}
                        value={formData.fullName}
                        className="text-text-muted w-full py-2 px-3 focus:outline-none border border-border bg-bg-surface rounded-lg"
                        id='fullName'
                        name='fullName'
                        placeholder="enter your name"
                        type="text" />
                </div>
                <div className='flex flex-col gap-2'>
                    <label
                        className='font-semibold'
                        htmlFor='email'>
                        Email
                    </label>
                    <input
                        onChange={handleChange}
                        value={formData.email}
                        className="text-text-muted w-full py-2 px-3 focus:outline-none border border-border bg-bg-surface rounded-lg"
                        id='email'
                        name='email'
                        placeholder="enter your email"
                        type="email" />
                </div>
                <div className='flex flex-col gap-2'>
                    <label
                        className='font-semibold'
                        htmlFor='password'>
                        Password
                    </label>
                    <div className='relative'>
                        <input
                            onChange={handleChange}
                            value={formData.password}
                            className=" text-text-muted w-full py-2 px-3 focus:outline-none border border-border bg-bg-surface rounded-lg"
                            id='password'
                            name='password'
                            placeholder="enter your password"
                            type={`${passwordVisible.password ? "text" : "password"}`}
                            autoComplete='off' />
                        <button
                            onClick={() => handlePasswordVisible("password")}
                            type='button'
                            className='absolute top-2 right-4 text-text-muted'>
                            <i className={`bi text-2xl ${passwordVisible.password ? "bi-eye" : "bi-eye-slash"}`}></i>
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
                            placeholder="confirm Password"
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
                        Register
                    </p>
                </button>
            </form>
            <div className='flex flex-col gap-4 text-center justify-end h-full'>
                <Link to="/auth"
                    className=' border-2 border-accent hover:bg-accent transition-all duration-300 py-2 px-10 rounded-lg'>
                    Back to Login Page
                </Link>
            </div>
        </div >
    )
}

export default AuthRegister