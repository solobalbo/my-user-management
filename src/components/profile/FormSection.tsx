type FormSectionProps = {
    title: string;
    children: React.ReactNode;
};

export default function FormSection({ title, children }: FormSectionProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
            {children}
        </div>
    );
}