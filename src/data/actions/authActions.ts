'use server';

import { api } from '@/lib/apiClient';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { forgotPasswordRequest } from '../services/forgotPassword';
import { uploadImageService } from '../services/uploadImage';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  domain: process.env.HOST ?? 'localhost',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

const schemaRegister = z.object({
  // Account details
  username: z.string().min(3).max(20, {
    message: 'Username must be between 3 and 20 characters',
  }),
  password: z.string().min(6).max(100, {
    message: 'Password must be between 6 and 100 characters',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),

  // Personal information
  firstName: z.string().min(1, { message: 'First name is required' }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  nickname: z.string().optional(),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  birthGender: z.enum(['M', 'F'], {
    required_error: 'Please select a gender',
  }),
  parentFullName: z
    .string()
    .min(1, { message: 'Parent/Guardian name is required' }),
  contactNumber: z.string().min(1, { message: 'Contact number is required' }),

  // Additional details
  teamName: z.string().optional(),
  riderType: z.enum(['FILIPINO', 'FOREIGN'], {
    required_error: 'Please select rider type',
  }),
  foreignCountry: z.string().optional(),

  // Files
  // racerPhoto: z
  //   .any()
  //   .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  //   .refine(
  //     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //     'Only .jpg, .jpeg, .png and .webp formats are supported.',
  //   ),
  identificationDocument: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
});

export async function registerUserAction(prevState: any, formData: FormData) {
  // Extract file data
  // const racerPhoto = formData.get('racerPhoto') as File;
  const identificationDocument = formData.get('identificationDocument') as File;

  // Validate form data
  const validatedFields = schemaRegister.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
    email: formData.get('email'),
    firstName: formData.get('firstName'),
    middleName: formData.get('middleName'),
    lastName: formData.get('lastName'),
    nickname: formData.get('nickname'),
    dateOfBirth: formData.get('dateOfBirth'),
    birthGender: formData.get('birthGender'),
    parentFullName: formData.get('parentFullName'),
    contactNumber: formData.get('contactNumber'),
    teamName: formData.get('teamName'),
    riderType: formData.get('riderType'),
    foreignCountry: formData.get('foreignCountry'),
    // racerPhoto,
    identificationDocument,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: 'Missing Fields. Failed to Register.',
    };
  }

  const createPayload = {
    data: {
      username: validatedFields.data.username,
      password: validatedFields.data.password,
      email: validatedFields.data.email,
      firstName: validatedFields.data.firstName,
      middleName: validatedFields.data.middleName,
      lastName: validatedFields.data.lastName,
      nickname: validatedFields.data.nickname,
      dateOfBirth: validatedFields.data.dateOfBirth,
      birthGender: validatedFields.data.birthGender,
      parentFullName: validatedFields.data.parentFullName,
      contactNumber: validatedFields.data.contactNumber,
      teamName: validatedFields.data.teamName,
      riderType: validatedFields.data.riderType,
      foreignCountry: validatedFields.data.foreignCountry,
    },
  };

  const userCreateResponseData = await api.user.signup(createPayload.data);

  if (!userCreateResponseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: 'Ops! Something went wrong. Please try again.',
    };
  }

  if (userCreateResponseData.error) {
    return {
      ...prevState,
      strapiErrors: userCreateResponseData.error,
      zodErrors: null,
      message: 'Failed to Register.',
    };
  }
  // upload proof of payment
  const uploadedImage = await uploadImageService(identificationDocument);
  const updatePayload = {
    data: {
      identificationDocument: uploadedImage?.data[0]?.id || null,
    },
  };

  // update user with identification document
  if (updatePayload.data.identificationDocument) {
    await api.user.update(userCreateResponseData.user?.id, updatePayload.data);
  }

  const cookieStore = await cookies();
  cookieStore.set('jwt', userCreateResponseData.jwt, config);

  redirect('/dashboard');
}

const schemaLogin = z.object({
  identifier: z
    .string()
    .min(3, {
      message: 'Identifier must have at least 3 or more characters',
    })
    .max(20, {
      message: 'Please enter a valid username',
    }),
  password: z
    .string()
    .min(6, {
      message: 'Password must have at least 6 or more characters',
    })
    .max(100, {
      message: 'Password must be between 6 and 100 characters',
    }),
});

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
    identifier: formData.get('identifier'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Login.',
    };
  }

  const responseData = await api.user.login(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Ops! Something went wrong. Please try again.',
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Failed to Login.',
    };
  }

  const cookieStore = await cookies();
  cookieStore.set('jwt', responseData.jwt, config);

  redirect('/dashboard');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set('jwt', '', { ...config, maxAge: 0 });
  redirect('/');
}

export async function forgotPasswordAction(
  initialState: any,
  formData: FormData,
) {
  // Get email from form data
  const email = formData.get('email');

  const errors: any = {};

  // Validate the form data
  if (!email) errors.email = 'Email is required';
  if (errors.email) {
    return {
      errors,
      values: { email },
      message: 'Error submitting form',
      success: false,
    };
  }

  console.log('Requesting password reset for:', email);

  // Reqest password reset link
  const res: any = await forgotPasswordRequest(email as string);

  console.log('Response from password reset request:', res);

  if (res.statusText !== 'OK') {
    return {
      errors: {},
      values: { email },
      message: res?.statusText || res,
      success: false,
    };
  }

  return {
    errors: {},
    values: { email },
    message: 'Password reset email sent',
    success: true,
  };
}
