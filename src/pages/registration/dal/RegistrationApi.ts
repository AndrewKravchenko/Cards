import { API } from '../../../main/dal/api';

export const createAuthAPI = {
  createAuth({ email, password }: RequestLoginDataType) {
    return API.post(`auth/register`, { email, password, })
      .then(response => response.data);
  },
};

type RequestLoginDataType = {
  email: string;
  password: string;
};
