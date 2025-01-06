'use client';

import { useState } from 'react';
import FormField from './FormField';
import FormSection from './FormSection';
import Toast from "@/components/ui/Toast";

type ProfileFormData = {
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    email: string;
    password: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    biography: string;
};

type ProfileFormProps = {
    formData: ProfileFormData;
    onSubmit: (e: React.FormEvent) => Promise<void>;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function ProfileForm({ formData, onSubmit, onChange }: ProfileFormProps) {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            await onSubmit(e);
            setToastMessage('Profil mis à jour avec succès');
            setToastType('success');
            setShowToast(true);
        } catch (err) {
            setToastMessage('Erreur lors de la mise à jour du profil');
            setToastType('error');
            setShowToast(true);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection title="Informations personnelles">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        label="Prénom"
                        name="firstName"
                        value={formData.firstName}
                        onChange={onChange}
                        required
                    />
                    <FormField
                        label="Nom"
                        name="lastName"
                        value={formData.lastName}
                        onChange={onChange}
                        required
                    />
                    <FormField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={onChange}
                        readOnly
                    />
                    <FormField
                        label="Mot de passe actuel"
                        name="currentPassword"
                        type="password"
                        value={formData.password}
                        onChange={onChange}
                        readOnly
                    />
                    <FormField
                        label="Nouveau mot de passe"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={onChange}
                    />
                    <FormField
                        label="Date de naissance"
                        name="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={onChange}
                        required
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Genre
                        </label>
                        <div className="flex gap-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="homme"
                                    checked={formData.gender === 'homme'}
                                    onChange={onChange}
                                    className="form-radio text-blue-600"
                                />
                                <span className="ml-2 text-gray-700 dark:text-gray-300">Homme</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="femme"
                                    checked={formData.gender === 'femme'}
                                    onChange={onChange}
                                    className="form-radio text-blue-600"
                                />
                                <span className="ml-2 text-gray-700 dark:text-gray-300">Femme</span>
                            </label>
                        </div>
                    </div>
                    <FormField
                        label="Adresse"
                        name="address"
                        value={formData.address}
                        onChange={onChange}
                        required
                    />
                    <FormField
                        label="Code postal"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={onChange}
                        required
                    />
                    <FormField
                        label="Ville"
                        name="city"
                        value={formData.city}
                        onChange={onChange}
                        required
                    />
                    <FormField
                        label="Pays"
                        name="country"
                        value={formData.country}
                        onChange={onChange}
                        required
                    />
                    <div className="md:col-span-2">
                        <label htmlFor="biography" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Biographie
                        </label>
                        <textarea
                            id="biography"
                            name="biography"
                            rows={4}
                            maxLength={120}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                            value={formData.biography}
                            onChange={onChange}
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {120 - formData.biography.length} caractères restants
                        </p>
                    </div>
                </div>
            </FormSection>

            <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
                Mettre à jour le profil
            </button>

            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}
        </form>
    );
}
