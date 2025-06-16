export const forgotPasswordRequest = async (email: string) => {
  try {
    const response = await fetch(
      `${process.env.STRAPI_BASE_URL}/api/auth/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, // user's email
        }),
      },
    );

    return response;
  } catch (error: any) {
    return (
      error?.response?.data?.error?.message ||
      'Error sending reset password email'
    );
  }
};
