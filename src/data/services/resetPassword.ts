export const resetPasswordRequest = async (credentials: any) => {
  try {
    const response = await fetch(
      `${process.env.STRAPI_BASE_URL}/api/auth/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: credentials?.code,
          password: credentials?.password,
          passwordConfirmation: credentials?.confirmPassword,
        }),
      },
    );

    return response;
  } catch (error: any) {
    return error?.response?.data?.error?.message || 'Error resetting password';
  }
};
