type ToastProps = {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
};

export default function Toast({ message, type, onClose }: ToastProps) {
    return (
        <div
            className={`
                fixed bottom-4 right-4 p-4 rounded-lg shadow-lg 
                ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} 
                text-white
                animate-toast-slide-in
                transform transition-all duration-300 ease-in-out
                hover:scale-105
            `}
        >
            <div className="flex items-center justify-between">
                <p className="animate-fade-in">{message}</p>
                <button
                    onClick={onClose}
                    className="ml-4 hover:opacity-75 transition-opacity duration-300 transform hover:scale-110"
                >
                    ×
                </button>
            </div>
        </div>
    );
}
