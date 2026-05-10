'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customRequestSchema, type CustomRequestInput } from '@/lib/validators';
import { cn } from '@/lib/utils';

const needTypeOptions = [
  { value: 'products_only', label: 'Acheter des produits spécifiques' },
  { value: 'list_help', label: 'Aide pour composer la liste' },
  { value: 'complete_pack', label: 'Obtenir un pack complet' },
  { value: 'remote_organization', label: 'Organiser à distance' },
  { value: 'advice', label: 'Conseil et orientation' },
  { value: 'other', label: 'Autre besoin' },
];

const budgetOptions = [
  'Moins de 500 €',
  '500 € - 1 000 €',
  '1 000 € - 2 000 €',
  '2 000 € - 5 000 €',
  'Plus de 5 000 €',
  'Je ne sais pas encore',
];

type FieldGroupProps = {
  children: React.ReactNode;
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
};

function FieldGroup({ children, label, htmlFor, required, error, hint }: FieldGroupProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-brun mb-1.5">
        {label} {required && <span className="text-bordeaux">*</span>}
      </label>
      {hint && <p className="text-xs text-brun-light/60 mb-1.5">{hint}</p>}
      {children}
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
}

const inputClass = 'w-full bg-ivoire border border-beige/80 rounded-xl px-4 py-3 text-sm text-brun placeholder-brun-light/40 focus:outline-none focus:ring-2 focus:ring-or/40 focus:border-or transition-colors';
const selectClass = cn(inputClass, 'appearance-none cursor-pointer');

export default function CustomRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomRequestInput>({
    resolver: zodResolver(customRequestSchema),
    defaultValues: {
      needType: 'complete_pack',
      hasExistingList: 'no',
    },
  });

  const onSubmit = async (data: CustomRequestInput) => {
    setServerError(null);
    try {
      const res = await fetch('/api/custom-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setServerError(json.message || 'Une erreur est survenue. Veuillez réessayer.');
      }
    } catch {
      setServerError('Une erreur de connexion est survenue. Veuillez réessayer.');
    }
  };

  if (submitted) {
    return (
      <div className="bg-beige rounded-3xl p-10 md:p-14 text-center max-w-2xl mx-auto">
        <span className="text-5xl block mb-5">🎉</span>
        <h2 className="font-serif text-bordeaux-dark text-2xl md:text-3xl font-semibold mb-4">
          Votre demande a bien été envoyée !
        </h2>
        <p className="text-brun-light text-base leading-relaxed">
          Merci pour votre demande. L&apos;équipe Prepare Ma Dot vous contactera rapidement sur WhatsApp pour mieux comprendre votre besoin et vous proposer la solution la plus adaptée.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* Section 1 — Coordonnées */}
      <div className="bg-beige rounded-2xl p-6 md:p-8">
        <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-6">
          Vos coordonnées
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <FieldGroup label="Nom complet" htmlFor="fullName" required error={errors.fullName?.message}>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                {...register('fullName')}
                className={inputClass}
                placeholder="Prénom et nom"
              />
            </FieldGroup>
          </div>
          <FieldGroup label="Adresse email" htmlFor="email" required error={errors.email?.message}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register('email')}
              className={inputClass}
              placeholder="votre@email.com"
            />
          </FieldGroup>
          <FieldGroup
            label="Numéro WhatsApp"
            htmlFor="whatsapp"
            required
            error={errors.whatsapp?.message}
            hint="Avec l'indicatif pays (ex: +33 6 12 34 56 78)"
          >
            <input
              id="whatsapp"
              type="tel"
              autoComplete="tel"
              {...register('whatsapp')}
              className={inputClass}
              placeholder="+33 6 12 34 56 78"
            />
          </FieldGroup>
        </div>
      </div>

      {/* Section 2 — Situation */}
      <div className="bg-beige rounded-2xl p-6 md:p-8">
        <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-6">
          Votre situation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FieldGroup label="Pays de résidence" htmlFor="residenceCountry">
            <input
              id="residenceCountry"
              type="text"
              {...register('residenceCountry')}
              className={inputClass}
              placeholder="Ex: France, Belgique, Canada…"
            />
          </FieldGroup>
          <FieldGroup label="Ville de livraison ou d'organisation" htmlFor="targetCity">
            <input
              id="targetCity"
              type="text"
              {...register('targetCity')}
              className={inputClass}
              placeholder="Ex: Paris, Kinshasa, Douala…"
            />
          </FieldGroup>
          <FieldGroup label="Culture ou pays concerné par la dot" htmlFor="cultureOrCountry">
            <input
              id="cultureOrCountry"
              type="text"
              {...register('cultureOrCountry')}
              className={inputClass}
              placeholder="Ex: Congo, Cameroun, Côte d'Ivoire…"
            />
          </FieldGroup>
          <FieldGroup label="Date prévue de la cérémonie" htmlFor="ceremonyDate">
            <input
              id="ceremonyDate"
              type="date"
              {...register('ceremonyDate')}
              className={inputClass}
            />
          </FieldGroup>
        </div>
      </div>

      {/* Section 3 — Besoin */}
      <div className="bg-beige rounded-2xl p-6 md:p-8">
        <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-6">
          Votre besoin
        </h2>
        <div className="space-y-5">
          <FieldGroup
            label="Quel est votre besoin principal ?"
            htmlFor="needType"
            required
            error={errors.needType?.message}
          >
            <select id="needType" {...register('needType')} className={selectClass}>
              {needTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </FieldGroup>

          <FieldGroup label="Budget estimatif" htmlFor="estimatedBudget">
            <select id="estimatedBudget" {...register('estimatedBudget')} className={selectClass}>
              <option value="">Sélectionner une fourchette</option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </FieldGroup>

          <FieldGroup label="Avez-vous déjà une liste ?" htmlFor="hasExistingList">
            <div className="flex gap-4">
              {[
                { value: 'yes', label: 'Oui, j\'ai une liste' },
                { value: 'no', label: 'Non, pas encore' },
                { value: 'not_sure', label: 'Pas encore complète' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={cn(
                    'flex-1 text-center py-2.5 px-3 rounded-xl border-2 cursor-pointer text-xs font-medium transition-colors',
                    'border-beige/60 text-brun-light hover:border-or/40'
                  )}
                >
                  <input
                    type="radio"
                    value={opt.value}
                    {...register('hasExistingList')}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup label="Message libre" htmlFor="message" hint="Décrivez votre besoin, vos traditions, vos contraintes…">
            <textarea
              id="message"
              rows={5}
              {...register('message')}
              className={cn(inputClass, 'resize-none')}
              placeholder="Partagez tout ce qui vous semble important pour que nous puissions bien vous accompagner…"
            />
          </FieldGroup>
        </div>
      </div>

      {/* Consentement */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('consentToContact')}
            className="mt-0.5 w-4 h-4 rounded accent-bordeaux flex-shrink-0"
          />
          <span className="text-sm text-brun-light leading-relaxed">
            J&apos;accepte d&apos;être contacté(e) par l&apos;équipe Prepare Ma Dot sur WhatsApp dans le cadre de ma demande. <span className="text-bordeaux">*</span>
          </span>
        </label>
        {errors.consentToContact && (
          <p className="text-red-500 text-xs mt-2 ml-7">{errors.consentToContact.message}</p>
        )}
      </div>

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-5 py-4 rounded-xl">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-bordeaux text-ivoire font-semibold text-base py-5 rounded-full hover:bg-bordeaux-dark disabled:opacity-50 transition-colors shadow-lg"
      >
        {isSubmitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
      </button>

      <p className="text-xs text-brun-light/50 text-center">
        Vos informations sont utilisées uniquement pour vous accompagner dans la préparation de votre dot. Elles ne sont jamais partagées avec des tiers.
      </p>
    </form>
  );
}
