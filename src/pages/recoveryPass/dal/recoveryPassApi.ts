import { message } from './messageTemplate';
import axios from 'axios';

export type RequestDataType = {
  email: string;
  from?: string;
  message?: string;
};

type ResponseDataType = {
  info: string;
  success: boolean;
  answer: boolean;
  html: boolean;
};

export const recoveryPassApi = {
  sendEmail({ email }: RequestDataType): Promise<ResponseDataType> {
    return axios.post<ResponseDataType>(`https://neko-back.herokuapp.com/2.0/auth/forgot`, {
      email,
      from: 'Card <mozgche6@gmail.com>',
      message,
    }).then((res) => res.data);
  },
};
