import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AlertFail from '../modal/AlertFail';

const AuthForm = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(null);
    const [respondMessage, setRespondMessage] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [passwordVisible, setPasswordVisible] = useState({
        password: false
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
        e.preventDefault()
        const { email, password } = formData;
        const existingUser = JSON.parse(localStorage.getItem("users")) || [];
        const foundUser = existingUser.find(
            (user) => user.email.toLowerCase() === email.toLowerCase()
        )
        if (formData.email === "" || formData.password === "") {
            setModal("fail")
            setRespondMessage("Fill all field to login")
            return
        }
        if (!foundUser) {
            setModal("fail")
            setRespondMessage("Your email has not registered yet")
            return
        }
        if (foundUser.password !== password) {
            setModal("fail")
            setRespondMessage("Incorrect password")
            return
        }
        localStorage.setItem("loginUser", JSON.stringify({
            name: foundUser.fullName,
            email: foundUser.email
        }))
        navigate("/dashboard")
    }

    return (
        <div className=" flex flex-col p-10 pt-20 h-screen md:h-1/2 lg:h-full text-text-primary">
            {modal === "fail" && (
                <AlertFail
                    respondMessage={respondMessage}
                    onClose={() => setModal(null)} />
            )}
            <h1 className='text-4xl  text-center'>
                LOGIN
            </h1>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 py-5 '>
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
                        type="email"
                        autoComplete='off' />
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
                <button
                    type='submit'
                    className=' bg-accent py-1 w-2/5 mx-auto hover:w-full rounded-lg transition-all duration-300'>
                    <p className='transition-all duration-300 py-1'>
                        Login
                    </p>
                </button>
            </form>
            <div className='flex flex-col gap-4 text-center justify-end h-full'>
                <Link to="register"
                    className=' border-2 border-accent hover:bg-accent transition-all duration-300 py-2 px-10 rounded-lg'>
                    Register
                </Link>
                <Link to="resendpassword"
                    className=' border-2 border-accent hover:bg-accent transition-all duration-300 py-2 px-10 rounded-lg'>
                    Forgot Password
                </Link>
            </div>
        </div >
    )
}

export default AuthForm