import { toast, ToastPosition } from 'react-toastify';

type ToastProps = {
    message: string;
    type: 'success' | 'error';
};

export default function Toast({ message, type }: ToastProps) {
    const toastOptions = {

        autoClose: 5000, // Close after 5 seconds (adjust as needed)
        hideProgressBar: false, // Show progress bar
        closeOnClick: true, // Close on click
        pauseOnHover: true, // Pause timer on hover
        draggable: true, // Allow dragging
        progress: undefined, // Customize progress bar (optional)
        theme: 'light', // or 'dark' or 'colored'
    };


    if (type === 'success') {
        toast.success(message, toastOptions);
    } else if (type === 'error') {
        toast.error(message, toastOptions);
    }

    return null; // No JSX required as react-toastify handles rendering
}
