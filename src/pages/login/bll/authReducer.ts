import { ThunkType } from '../../../main/bll/store';
import { authAPI } from '../dal/loginApi';
import {
  changeAuthAPI, changeAuthImageAPI,
  isAuthAPI,
  logOutAPI,
} from '../../profile/dal/profileApi';
import { createAuthAPI } from '../../registration/dal/RegistrationApi';
import { setNewPassAPI } from '../../setPass/dal/setPassApi';
import { FileAPI } from '../../../main/dal/api';

export enum loginActionType {
  SET_LOADING = 'AUTH/LOGIN/SET_LOADING',
  SET_USER = 'AUTH/LOGIN/SET_USER',
  SET_ERROR = 'AUTH/LOGIN/SET_ERROR',
  SET_SUCCESS = 'AUTH/LOGIN/SET_SUCCESS',
  CHANGE_USER = 'AUTH/LOGIN/CHANGE_USER',
  IS_INITIAL = 'AUTH/LOGIN/IS_INITIAL'
}

const user = {
  _id: '',
  email: '',
  name: '',
  publicCardPacksCount: 0, // количество колод

  created: new Date(),
  updated: new Date(),
  isAdmin: false,
  verified: false, // подтвердил ли почту
  rememberMe: false,
};

const initialState: StateType = {
  user,
  loading: false,
  success: false,
  error: '',
  isInitial: false,
};

export const authReducer = (
  state = initialState,
  action: ActionsLoginType,
): StateType => {
  switch (action.type) {
    case loginActionType.SET_USER:
      return { ...state, user: action.payload.user };
    case loginActionType.CHANGE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
          avatar: action.payload.avatar
        },
      };
    case loginActionType.IS_INITIAL:
    case loginActionType.SET_LOADING:
    case loginActionType.SET_ERROR:
    case loginActionType.SET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: false,
        error: '',
        ...action.payload,
      };
    default:
      return state;
  }
};

/** Actions */
export const setLoading = (loading: boolean) => ({
  type: loginActionType.SET_LOADING,
  payload: {
    loading,
  },
} as const);
export const setSuccess = (success: boolean) => ({
    type: loginActionType.SET_SUCCESS,
    payload: {
      success,
    },
} as const);
export const setIsInitial = (isInitial: boolean) => ({
    type: loginActionType.IS_INITIAL,
    payload: {
      isInitial,
    },
} as const);
export const setUser = (user: UserType) => ({
  type: loginActionType.SET_USER,
  payload: {
    user
  }
} as const);
export const setErrorLogin = (error: string) => ({
    type: loginActionType.SET_ERROR,
    payload: {
      error,
    },
} as const);
export const changeUser = (name: string, avatar: string) => ({
  type: loginActionType.CHANGE_USER,
  payload: {
    name,
    avatar,
  }
} as const);

/** Thunks */
export const loginPageTC = (
  email: string, password: string, rememberMe: boolean
): ThunkType<ActionsLoginType> =>
  async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setErrorLogin(''));
    const data = await authAPI.login(
      { email, password, rememberMe }
    );
    dispatch(setUser(data));
    dispatch(setSuccess(true));
  } catch (e) {
    const error = e.response
      ? e.response.data.error
      : (e.message + ', more details in the console');
    dispatch(setErrorLogin(error));
  }
};
export const CreateAuthTC = (
  email: string, password: string
): ThunkType<ActionsLoginType> =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setErrorLogin(''));
      const data = await createAuthAPI.createAuth(
        { email, password }
      );
      dispatch(setUser(data));
      dispatch(setSuccess(true));
    } catch (e) {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
      dispatch(setErrorLogin(error));
    }
  };
export const logoutTC = (): ThunkType<ActionsLoginType> =>
  async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await logOutAPI.logOut();
    dispatch(setUser(user));
    dispatch(setLoading(false));
  } catch (e) {
    const error = e.response
      ? e.response.data.error
      : (e.message + ', more details in the console');
    dispatch(setErrorLogin(error));
  }
};
export const isAuthTC = (): ThunkType<ActionsLoginType> =>
  async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setErrorLogin(''));
    const data = await isAuthAPI.isAuth();
    await isAuthAPI.isAuth();
    dispatch(setUser(data));
    dispatch(setLoading(false));
  } catch (e) {
    const error = e.response
      ? e.response.data.error
      : (e.message + ', more details in the console');
    dispatch(setErrorLogin(error));
  } finally {
    dispatch(setIsInitial(true));
  }
};
export const changeAuthTC = (
  name: string,
  avatar: string
): ThunkType<ActionsLoginType> =>
  async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await changeAuthAPI.changeAuth({ name, avatar });
    dispatch(setLoading(false));
    dispatch(changeUser(
      data.updatedUser.name,
      data.updatedUser.avatar ? data.updatedUser.avatar : ''
    ));
  } catch (e) {
    const error = e.response
      ? e.response.data.error
      : (e.message + ', more details in the console');
    dispatch(setErrorLogin(error));
  }
};
export const changeAuthImageTC = (
  fileData: FormData,
  name: string,
  avatar: string
): ThunkType<ActionsLoginType> =>
  async (dispatch) => {
    try {
      debugger
      dispatch(setLoading(true));
      await changeAuthImageAPI.changeAuthImage({ fileData } );
      dispatch(changeAuthTC(name, avatar ))
      dispatch(setLoading(false));
    } catch (e) {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
      dispatch(setErrorLogin(error));
    }
  };

export const setNewPassTC = (
  password: string,
  resetPasswordToken: string
): ThunkType =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await setNewPassAPI.setNewPass({ password, resetPasswordToken });
      dispatch(setLoading(false));
    } catch (e) {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
      dispatch(setErrorLogin(error));
    }
  };

/** Types */
export type StateType = {
  user: UserType;
  loading: boolean;
  success: boolean;
  error: string;
  isInitial: boolean;
};

export type ActionsLoginType = ReturnType<typeof setLoading>
  | ReturnType<typeof setUser>
  | ReturnType<typeof setErrorLogin>
  | ReturnType<typeof setSuccess>
  | ReturnType<typeof changeUser>
  | ReturnType<typeof setIsInitial>;

export type UserType = {
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
}
