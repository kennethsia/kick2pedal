import { fetchClient } from './fetchClient';

// Define your API response types
interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  maxCapacity?: number;
}

interface RegisterUser {
  username: string;
  password: string;
  email: string;
}

interface LoginUser {
  identifier: string;
  password: string;
}

interface HomePage {
  title: string;
  description?: string;
}

// Define your API client methods
export const api = {
  user: {
    signup: (data: RegisterUser) =>
      fetchClient<RegisterUser>('/auth/local/register', {
        method: 'POST',
        body: data,
      }),
    login: (data: LoginUser) =>
      fetchClient<LoginUser>('/auth/local', {
        method: 'POST',
        body: data,
      }),
  },

  events: {
    list: () => fetchClient<Event[]>('/events'),
    get: (id: string) => fetchClient<Event>(`/events/${id}`),
    create: (data: Omit<Event, 'id'>) =>
      fetchClient<Event>('/events', { method: 'POST', body: data }),
    update: (id: string, data: Partial<Event>) =>
      fetchClient<Event>(`/events/${id}`, { method: 'PUT', body: data }),
    delete: (id: string) =>
      fetchClient<void>(`/events/${id}`, { method: 'DELETE' }),
  },

  homePage: {
    list: () => fetchClient<HomePage[]>('/home-page'),
  },
};
