import { API } from 'src/main/dal/api';

export const setNewPassAPI = {
  setNewPass({ password, resetPasswordToken }: RequestNewPassDataType) {
    return API.post(
      `auth/set-new-password`, { password, resetPasswordToken }
    )
      .then(response => response.data);
  },
};

type RequestNewPassDataType = {
  password: string;
  resetPasswordToken: string;
};
