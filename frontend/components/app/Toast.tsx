import React from 'react';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {

    const alertClass = {
        success: 'alert-success',
        error: 'alert-error',
        info: 'alert-info',
        warning: 'alert-warning'
    }[type];

    return (
        <div className="toast toast-end toast-bottom z-50">
            <div className={`alert ${alertClass} shadow-lg text-white`}>
                <div className="flex items-center gap-2">
                    {type === 'success' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                    <span className="font-bold">{message}</span>
                </div>
            </div>
        </div>
    );
};

export default Toast;