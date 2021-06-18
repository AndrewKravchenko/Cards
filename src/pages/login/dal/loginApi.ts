import { API } from 'src/main/dal/api';

export const authAPI = {
  login({ email, password, rememberMe }: RequestLoginDataType) {
    return API.post<ResponseUserDataType>(
      `auth/login`, { email, password, rememberMe }
    )
      .then(response => response.data);
  },
};

type RequestLoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ResponseUserDataType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number; // количество колод

  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;

  error?: string;
};
