import { API, FileAPI } from 'src/main/dal/api';
import { ResponseUserDataType } from 'src/pages/login/dal/loginApi';

export const logOutAPI = {
  logOut() {
    return API.delete(`auth/me`)
      .then(response => response.data);
  },
};
export const isAuthAPI = {
  isAuth() {
    return API.post<ResponseUserDataType>(`auth/me`)
      .then(response => {
        return response.data;
      });
  },
};
type ResponseChangeAuth = { updatedUser: ResponseUserDataType };
export const changeAuthAPI = {
  changeAuth({ name, avatar }: RequestChangeUserDataType) {
    return API.put<ResponseChangeAuth>(`auth/me`, { name, avatar })
      .then(response => response.data);
  },
};
export const changeAuthImageAPI = {
  changeAuthImage({ fileData }: RequestChangeAuthImageDataType) {
    return FileAPI.post(`file`, fileData)
      .then(response => response.data);
  }
};

type RequestChangeUserDataType = {
  name: string;
  avatar: string;
};
type RequestChangeAuthImageDataType = {
  fileData: FormData;
};
