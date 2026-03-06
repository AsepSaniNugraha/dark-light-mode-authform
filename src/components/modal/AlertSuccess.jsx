import React from 'react'

const AlertSuccess = ({ respondMessage, onClose }) => {
    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-50'>
            <div className='flex flex-col gap-4 justify-center items-center bg-bg-primary w-3/4 h-1/3 rounded-xl p-6 text-center text-text-primary'>
                <i class="bi bi-check-circle text-5xl"></i>
                <p>{respondMessage}</p>
                <button
                    onClick={onClose}
                    className='text-text-primary border-2 border-accent hover:bg-accent transition-all duration-300 py-2 px-10 rounded-lg mt-6'>
                    OK
                </button>
            </div>
        </div>
    )
}

export default AlertSuccess