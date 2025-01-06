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
const [errors, setErrors] = useState<{ [key: string]: string }>({});

const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // Email validation
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "L'adresse email n'est pas valide";
        }

        // Password validation (only if it's being changed)
        if (formData.password && formData.password.length < 8) {
            newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
        }

        // Name validations
        if (!formData.firstName.trim()) {
            newErrors.firstName = "Le prénom ne peut pas être vide";
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Le nom ne peut pas être vide";
        }

        // Birth date validation
        if (!formData.birthDate) {
            newErrors.birthDate = "La date de naissance est requise";
        }

        // Address validations
        if (!formData.address.trim()) {
            newErrors.address = "L'adresse ne peut pas être vide";
        }
        if (!formData.postalCode.trim()) {
            newErrors.postalCode = "Le code postal ne peut pas être vide";
        }
        if (!formData.city.trim()) {
            newErrors.city = "La ville ne peut pas être vide";
        }

        // Gender validation
        if (!formData.gender) {
            newErrors.gender = "Veuillez sélectionner un genre";
        }

        // Biography validation
        if (formData.biography.length > 120) {
            newErrors.biography = "La biographie ne doit pas dépasser 120 caractères";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await onSubmit(e);
                Toast({message: 'Profil mis à jour avec succès', type: 'success'});
            } catch (err) {
                Toast({message: 'Erreur lors de la mise à jour du profil', type: 'error'});
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            {/* Section des informations personnelles */}
            <FormSection title="Informations personnelles" className="animate-slide-up delay-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Champs pour le prénom et le nom */}
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

                    {/* Champs pour l'email et le mot de passe */}
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

                    {/* Champs pour la date de naissance et le genre */}
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

                    {/* Champs pour l'adresse, le code postal, la ville et le pays */}
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
                    {/* Champ pour la biographie */}
                    <div className="md:col-span-2">
                        <label htmlFor="biography"
                               className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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

            {/* Bouton de soumission du formulaire */}
            <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 animate-slide-up delay-200"
            >
                Mettre à jour le profil
            </button>


        </form>
    );
}
