'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput } from '@/lib/validators';

export default function ContactFormWrapper() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        reset();
      } else {
        setError(json.message || 'Une erreur est survenue. Veuillez réessayer.');
      }
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <span className="text-4xl block mb-4">✅</span>
        <h3 className="font-serif text-bordeaux-dark text-xl font-semibold mb-2">Message envoyé</h3>
        <p className="text-brun-light text-sm">
          Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Nom */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-brun mb-1.5">
          Nom complet <span className="text-bordeaux">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          {...register('name')}
          className="w-full bg-ivoire border border-beige/80 rounded-xl px-4 py-3 text-sm text-brun placeholder-brun-light/40 focus:outline-none focus:ring-2 focus:ring-or/40 focus:border-or transition-colors"
          placeholder="Votre nom complet"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-brun mb-1.5">
          Email <span className="text-bordeaux">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          {...register('email')}
          className="w-full bg-ivoire border border-beige/80 rounded-xl px-4 py-3 text-sm text-brun placeholder-brun-light/40 focus:outline-none focus:ring-2 focus:ring-or/40 focus:border-or transition-colors"
          placeholder="votre@email.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-brun mb-1.5">
          Message <span className="text-bordeaux">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          {...register('message')}
          className="w-full bg-ivoire border border-beige/80 rounded-xl px-4 py-3 text-sm text-brun placeholder-brun-light/40 focus:outline-none focus:ring-2 focus:ring-or/40 focus:border-or transition-colors resize-none"
          placeholder="Décrivez votre question ou votre besoin..."
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-bordeaux text-ivoire font-semibold text-sm py-4 rounded-full hover:bg-bordeaux-dark disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? 'Envoi en cours…' : 'Envoyer le message'}
      </button>
    </form>
  );
}
