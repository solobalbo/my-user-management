type FormFieldProps = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
    required?: boolean;
    readOnly?: boolean;
    error?: string; // Add this line
};

export default function FormField({
    label,
    name,
    value,
    onChange,
    type = 'text',
    required = false,
    readOnly = false,
    error, // Add this line
}: FormFieldProps) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                required={required}
                readOnly={readOnly}
                className={`w-full px-3 py-2 border ${
                    error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                } rounded-lg ${
                    readOnly
                        ? 'bg-gray-50 dark:bg-gray-700 cursor-not-allowed'
                        : 'focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800'
                } dark:text-white`}
                value={value}
                onChange={onChange}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}