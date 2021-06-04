import { ThunkType } from '../../../main/bll/store';
import { CardsPackResponseType, packsAPI } from '../dal/PacksApi';

export enum packsActionType {
  SET_LOADING = 'CARDS/PACKS/SET_LOADING',
  SET_ERROR_PACKS = 'CARDS/PACKS/SET_ERROR_PACKS',
  SET_PACKS = 'CARDS/PACKS/SET_PACKS',
}

const initialState: StateType = {
  cardPacks: [],
  loading: false,
  error: '',
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1,
  pageCount: 100,
};

export const packsReducer = (
  state = initialState,
  action: ActionsPacksType,
): StateType => {
  switch (action.type) {
    case packsActionType.SET_LOADING:
      return { ...state, error: '', loading: action.payload.loading };
    case packsActionType.SET_ERROR_PACKS:
      return {
        ...state, loading: false,
        error: action.payload.error,
      };
    case packsActionType.SET_PACKS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

/** Actions */
export const setLoading = (loading: boolean) => ({
  type: packsActionType.SET_LOADING,
  payload: {
    loading,
  },
} as const);
export const setCardsPacks = (payload: CardsPackResponseType) => ({
  type: packsActionType.SET_PACKS,
  payload
} as const);
export const setErrorPacks = (error: string) => ({
  type: packsActionType.SET_ERROR_PACKS,
  payload: {
    error,
  },
} as const);

/** Thunks */
export const getCardsPacksTC = (
  userId: string, pageCount: number, page: number
): ThunkType<ActionsPacksType> =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await packsAPI.getPacks(userId, pageCount, page);
      dispatch(setCardsPacks(data));
      dispatch(setLoading(false));
    } catch (e) {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
      dispatch(setErrorPacks(error));
    }
  };
export const addCardsPackTC = (
  name: string, privat: boolean, userId: string,
  pageCount: number, page: number
): ThunkType<ActionsPacksType> =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await packsAPI.addPack(name, privat);
      await dispatch(getCardsPacksTC(userId, pageCount, page));
      dispatch(setLoading(false));
    } catch (e) {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
      dispatch(setErrorPacks(error));
    }
  };
export const updatedCardsPackTC = (
  changedPackName: string, cardsPackId: string, userId: string,
  pageCount: number, page: number
): ThunkType<ActionsPacksType> =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await packsAPI.updatedPacks(changedPackName, cardsPackId);
      await dispatch(getCardsPacksTC(userId, pageCount, page));
      dispatch(setLoading(false));
    } catch (e) {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
      dispatch(setErrorPacks(error));
    }
  };
export const deletedCardsPackTC = (
  cardsPackId: string, userId: string,
  pageCount: number, page: number
): ThunkType<ActionsPacksType> =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await packsAPI.deletePack(cardsPackId);
      await dispatch(getCardsPacksTC(userId, pageCount, page));
      dispatch(setLoading(false));
    } catch (e) {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
      dispatch(setErrorPacks(error));
    }
  };

/** Types */
export type StateType = {
  cardPacks: CardPacksType[];
  cardPacksTotalCount: number // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number // количество элементов на странице
  loading: boolean;
  error: string;
};

export type ActionsPacksType = ReturnType<typeof setLoading>
  | ReturnType<typeof setCardsPacks>
  | ReturnType<typeof setErrorPacks>

export type CardPacksType = {
  _id: string
  user_id: string
  name: string
  path: string // папка
  cardsCount: number
  grade: number // средняя оценка карточек
  shots: number // количество попыток
  rating: number // лайки
  type: string // ещё будет "folder" (папка)
  created: string
  updated: string
  __v: number
  private?: boolean
}
