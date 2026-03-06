import React from 'react'

const AlertLogout = ({ respondMessage, onCancel, onProceed }) => {
    return (
        <div className='fixed inset-0 flex flex-col justify-center items-center bg-black/50 z-50'>
            <div className='flex flex-col gap-4 justify-center items-center bg-bg-primary w-3/4 rounded-xl p-6 text-text-primary text-center'>
                <i className="bi bi-exclamation-circle text-5xl"></i>
                <p>{respondMessage}</p>
                <div className='flex flex-col gap-4 text-center'>
                    <button
                        onClick={onCancel}
                        className='border-2 border-accent hover:bg-accent transition-all duration-300 py-2 px-10 rounded-lg'>
                        Cancel
                    </button>
                    <button
                        onClick={onProceed}
                        className='border-2 border-accent hover:bg-accent transition-all duration-300 py-2 px-10 rounded-lg'>
                        Yes, logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AlertLogout