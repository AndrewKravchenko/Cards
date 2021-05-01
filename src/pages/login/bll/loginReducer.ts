import { ThunkType } from '../../../main/bll/store';
import { authAPI } from '../dal/loginApi';
import { changeAuthAPI, isAuthAPI, logOutAPI } from '../../profile/dal/profileApi';

export enum loginActionType {
  SET_LOADING = 'CARDS/LOGIN/SET_LOADING',
  SET_USER = 'CARDS/LOGIN/SET_USER',
  SET_ERROR = 'CARDS/LOGIN/SET_ERROR',
  SET_SUCCESS = 'CARDS/LOGIN/SET_SUCCESS',
  CHANGE_USER = 'CARDS/LOGIN/CHANGE_USER',
  IS_INITIAL = 'CARDS/LOGIN/IS_INITIAL'
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
  isInitial: false
};

export const loginReducer = (
  state = initialState,
  action: ActionsType,
): StateType => {
  switch (action.type) {
    case loginActionType.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
        success: false,
        error: '',
      };
    case loginActionType.SET_USER:
      return { ...state, user: action.user };
    case loginActionType.CHANGE_USER:
      return {
        ...state,
        user: { ...state.user, name: action.name, avatar: action.avatar },
      };
    case loginActionType.SET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        error: '',
      };
      case loginActionType.IS_INITIAL:
      return {
        ...state,
        isInitial: action.payload.isInitial,
      };
    case loginActionType.SET_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error,
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
export const setSuccess = (success: boolean) =>
  ({
    type: loginActionType.SET_SUCCESS,
    payload: {
      success,
    },
  } as const);
export const setIsInitial = (isInitial: boolean) =>
  ({
    type: loginActionType.IS_INITIAL,
    payload: {
      isInitial,
    },
  } as const);
export const setUser = (user: UserType) => ({ type: loginActionType.SET_USER, user } as const);
export const setError = (error: string) =>
  ({
    type: loginActionType.SET_ERROR,
    payload: {
      error,
    },
  } as const);
export const changeUser = (name: string, avatar: string) => ({
  type: loginActionType.CHANGE_USER,
  name,
  avatar,
} as const);

/** Thunks */
export const loginPageTC = (email: string, password: string, rememberMe: boolean): ThunkType<ActionsType> => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    let data = await authAPI.login(email, password, rememberMe);
    dispatch(setUser(data));
    dispatch(setError(''));
    dispatch(setSuccess(true));
  } catch (e) {
    const error = e.response
      ? e.response.data.error
      : (e.message + ', more details in the console');
    dispatch(setError(error));
  }
};
export const logoutTC = (): ThunkType<ActionsType> => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await logOutAPI.logOut();
    dispatch(setLoading(false));
    dispatch(setUser(user));

  } catch (e) {
    const error = e.response
      ? e.response.data.error
      : (e.message + ', more details in the console');
    dispatch(setError(error));
  }
};
export const isAuthTC = (): ThunkType<ActionsType> => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    let data = await isAuthAPI.isAuth();
    dispatch(setIsInitial(true))
    dispatch(setUser(data));
    dispatch(setError(''));
    dispatch(setLoading(false));
  } catch (e) {
    const error = e.response
      ? e.response.data.error
      : (e.message + ', more details in the console');
    dispatch(setError(error));
  }
};
export const changeAuthTC = (name: string, avatar: string): ThunkType<ActionsType> => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    let data = await changeAuthAPI.changeAuth(name, avatar);
    dispatch(setLoading(false));
    dispatch(changeUser(data.updatedUser.name, data.updatedUser.avatar));
  } catch (e) {
    const error = e.response
      ? e.response.data.error
      : (e.message + ', more details in the console');
    dispatch(setError(error));
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

type ActionsType = ReturnType<typeof setLoading>
  | ReturnType<typeof setUser>
  | ReturnType<typeof setError>
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