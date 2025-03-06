import { getAuthToken } from './getToken';

export async function getUserMeLoader() {
  const baseUrl = `${process.env.STRAPI_BASE_URL}/api`;

  const url = new URL('/users/me', baseUrl);

  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(
      `${process.env.STRAPI_BASE_URL}/api/users/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    const data = await response.json();
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    // console.log(error);
    // return { ok: false, data: null, error: error };
  }
}
