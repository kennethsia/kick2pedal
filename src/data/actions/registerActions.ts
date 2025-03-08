'use server';

import { uploadImageService } from '@/data/services/uploadImage';
import { api } from '@/lib/apiClient';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const MAX_FILE_SIZE = 5000000; // 5MB

const BikeBrands = [
  'PAPA_BIKE',
  'BIKE8',
  'XPUSH',
  'MARU',
  'CISCO',
  'ROCKFISH',
  'ZOOMI',
  'OTHERS',
] as const;

const WheelsetBrands = [
  'DATI',
  'MOSTSPORT',
  'SKAIDI',
  'GIPSY',
  'ROCKFISH',
  'FU_JIN',
  'TOMORROW',
  'OTHERS',
] as const;

const formSchema = z.object({
  category: z.string(),
  additional_category_1: z.string().optional(),
  additional_category_2: z.string().optional(),
  amount: z.string(),
  proofOfPayment: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
});

export async function createRegistrationAction(
  prevState: any,
  formData: FormData,
) {
  const validatedFields = formSchema.safeParse({
    category: formData.get('category'),
    additional_category_1: formData.get('additional_category_1'),
    additional_category_2: formData.get('additional_category_2'),
    amount: formData.get('amount'),
    proofOfPayment: formData.get('proofOfPayment'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // Upload image first
  const file = formData.get('proofOfPayment') as File;
  const uploadedImage = await uploadImageService(file);

  // Create registration
  const input = {
    data: {
      registration_status: 'registered' as const,
      amount: parseInt(validatedFields.data.amount),
      event: {
        connect: [formData.get('eventId')],
      },
      user: {
        connect: [parseInt(formData.get('userId') as string)],
      },
      category: {
        connect: [parseInt(validatedFields.data.category)],
      },
      ...(validatedFields.data.additional_category_1 && {
        additional_category_1: {
          connect: [parseInt(validatedFields.data.additional_category_1)],
        },
      }),
      ...(validatedFields.data.additional_category_2 && {
        additional_category_2: {
          connect: [parseInt(validatedFields.data.additional_category_2)],
        },
      }),
      proofOfPayment: uploadedImage.data[0].id,
    },
  };

  const responseData = await api.registration.create(input);
  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: 'Ops! Something went wrong. Please try again.',
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Failed to Register.',
    };
  }

  redirect('/dashboard');
}
