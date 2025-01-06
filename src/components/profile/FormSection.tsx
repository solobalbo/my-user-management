type FormSectionProps = {
    title: string;
    children: React.ReactNode;
    className?: string;
};

export default function FormSection({ title, children, className = '' }: FormSectionProps) {
    return (
        <div className={`space-y-4 transition-all duration-300 ease-in-out ${className}`}>
            {/* Titre de la section */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 transform transition-all duration-300 hover:translate-x-1">
                {title}
            </h2>
            {/* Contenu de la section */}
            <div className="transition-all duration-300 ease-in-out">
                {children}
            </div>
        </div>
    );
}