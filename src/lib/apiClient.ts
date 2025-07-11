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

// Define the possible enum values
type RegistrationStatus = 'registered' | 'waitlisted' | 'confirmed';

type BikeBrand =
  | 'PAPA_BIKE'
  | 'BIKE8'
  | 'XPUSH'
  | 'MARU'
  | 'CISCO'
  | 'ROCKFISH'
  | 'ZOOMI'
  | 'OTHERS';

type WheelsetBrand =
  | 'DATI'
  | 'MOSTSPORT'
  | 'SKAIDI'
  | 'GIPSY'
  | 'ROCKFISH'
  | 'FU_JIN'
  | 'TOMORROW'
  | 'OTHERS';

interface Category {
  id: number;
  name: string;
  description?: string;
}

interface Registration {
  registration_status: RegistrationStatus;
  event: any;
  user: any;
  category: any;
  additional_category_1?: any;
  additional_category_2?: any;
}

interface RegistrationCreate {
  data: {
    registration_status: 'registered';
    event: {
      connect: any[];
    };
    user: {
      connect: any[];
    };
    category: {
      connect: any[];
    };
    additional_category_2?:
      | {
          connect: any[];
        }
      | undefined;
    additional_category_1?:
      | {
          connect: any[];
        }
      | undefined;
    proofOfPayment: number;
  };
}

interface RegisterUser {
  username: string;
  password: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  nickname?: string;
  dateOfBirth: string;
  birthGender: 'M' | 'F';
  parentFullName: string;
  contactNumber: string;
  plateNumber?: string;
  teamName?: string;
  riderType: 'FILIPINO' | 'FOREIGN';
  foreignCountry?: string;
  racerPhoto?: any;
  identificationDocument?: any;
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
    update: (id: string, data: Partial<RegisterUser>) =>
      fetchClient<RegisterUser>(`/users/${id}`, { method: 'PUT', body: data }),
    listAll: () =>
      fetchClient<RegisterUser>(
        `/users?populate[identificationDocument][populate]=*&pagination[page]=1&pagination[pageSize]=200`,
      ),
  },

  registration: {
    create: (data: RegistrationCreate) =>
      fetchClient<RegistrationCreate>('/registrations', {
        method: 'POST',
        body: data,
      }),
    list: (id: string) =>
      fetchClient<Registration[]>(
        `/registrations?filters[user][documentId][$eq]=${id}&populate=*`,
      ),
    listAll: () =>
      // fetchClient<Registration[]>(
      //   `/registrations?populate=*&pagination[page]=1&pagination[pageSize]=500&filters[event][id][$in][0]=73&filters[event][id][$in][1]=76&sort[0]=createdAt:desc`,
      // ),
      fetchClient<Registration[]>(
        `/registrations?populate=*&pagination[page]=1&pagination[pageSize]=500&sort[0]=createdAt:desc`,
      ),
  },

  events: {
    list: () => fetchClient<Event[]>('/events?populate=*'),
    get: (id: string) => fetchClient<Event>(`/events/${id}?populate=*`),
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
