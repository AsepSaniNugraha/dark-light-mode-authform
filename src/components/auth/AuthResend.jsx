import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AlertFail from '../modal/AlertFail';
import AlertSuccess from '../modal/AlertSuccess';

const AuthResend = () => {
    const [modal, setModal] = useState(null)
    const [respondMessage, setRespondMessage] = useState("")
    const [emailUser, setEmailuser] = useState("")
    const [formData, setFormData] = useState({
        email: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { email } = formData
        const existingUser =
            JSON.parse(localStorage.getItem("users")) || [];
        const foundUser = existingUser.find(
            (user) => user.email.toLowerCase() === email.toLowerCase()
        )
        if (formData.email.trim() === "") {
            setModal("fail")
            setRespondMessage("Enter your registered email")
            return
        }
        if (!foundUser) {
            setModal("fail")
            setRespondMessage("Your email has not registered yet")
            return
        }
        setModal("success")
        setRespondMessage("Reset password succeed")
        setEmailuser(foundUser.email)
        setFormData({ email: "" })
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
                    onClose={() => setModal("report")} />
            )}
            <h1 className='text-4xl  text-center'>
                RESEND
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
                <button
                    type='submit'
                    className=' bg-accent py-1 w-2/5 mx-auto hover:w-full rounded-lg transition-all duration-300'>
                    <p className='transition-all duration-300 py-1'>
                        Resend
                    </p>
                </button>
            </form>
            <div>
                <p className=''>Your new password will be sent to your registered email</p>
                <div className='text-center mt-5'>
                    {modal === "report" && (
                        <div>
                            <p className=''>Please check your email</p>
                            <p className=''>{emailUser}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-4 text-center justify-end h-full'>
                <Link to="/auth"
                    className=' border-2 border-accent hover:bg-accent transition-all duration-300 py-2 px-10 rounded-lg'>
                    Back to Login Page
                </Link>
            </div>
        </div >
    )
}

export default AuthResend