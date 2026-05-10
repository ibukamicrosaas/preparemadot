import { z } from 'zod';

export const customRequestSchema = z.object({
  fullName: z.string().min(2, 'Le nom complet est requis').max(100),
  email: z.string().email('Adresse email invalide').max(200),
  whatsapp: z.string().min(8, 'Numéro WhatsApp requis').max(20),
  residenceCountry: z.string().max(100).optional(),
  targetCity: z.string().max(100).optional(),
  cultureOrCountry: z.string().max(100).optional(),
  ceremonyDate: z.string().max(20).optional(),
  estimatedBudget: z.string().max(50).optional(),
  needType: z.enum([
    'products_only',
    'list_help',
    'complete_pack',
    'remote_organization',
    'advice',
    'other',
  ]),
  hasExistingList: z.enum(['yes', 'no', 'not_sure']).optional(),
  message: z.string().max(2000).optional(),
  consentToContact: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter d\'être contacté(e)',
  }),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Le nom est requis').max(100),
  email: z.string().email('Adresse email invalide').max(200),
  message: z.string().min(10, 'Le message est trop court').max(2000),
});

export type CustomRequestInput = z.infer<typeof customRequestSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
