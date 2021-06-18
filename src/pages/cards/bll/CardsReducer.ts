import { ThunkType } from 'src/main/bll/store';
import {
  cardsApi,
  CardsResponseDataType,
  CardsType
} from 'src/pages/cards/dal/CardsApi';

export enum cardsActionType {
  SET_LOADING_CARDS = 'CARDS/CARDS/SET_LOADING',
  SET_ERROR_CARDS = 'CARDS/CARDS/SET_ERROR_PACKS',
  SET_CARDS = 'CARDS/CARDS/SET_PACKS',
}

const initialState: StateType = {
  cards: [],
  loading: false,
  error: '',
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 0,
  pageCount: 4,
  packUserId: '',
};

export const cardsReducer = (
  state = initialState,
  action: ActionsCardsType,
): StateType => {
  switch (action.type) {
    case cardsActionType.SET_LOADING_CARDS:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case cardsActionType.SET_ERROR_CARDS:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case cardsActionType.SET_CARDS:
      return { ...state, ...action.payload.data };
    default:
      return state;
  }
};

/** Actions */
export const setLoadingCards = (loading: boolean) => ({
  type: cardsActionType.SET_LOADING_CARDS,
  payload: {
    loading,
  }
} as const);
export const setCards = (data: CardsResponseDataType) => ({
  type: cardsActionType.SET_CARDS,
  payload: {
    data
  }
} as const);
export const setErrorCards = (error: string) => ({
  type: cardsActionType.SET_ERROR_CARDS,
  payload: {
    error,
  },
} as const);

/** Thunks */
export const getCardsTC = (
  cardsPack_id: string, pageCount?: number, page?: number
): ThunkType<ActionsCardsType> =>
  async (dispatch) => {
    try {
      dispatch(setLoadingCards(true));
      const data = await cardsApi.getCards(
        { cardsPack_id, pageCount, page }
      );
      dispatch(setCards(data));
      dispatch(setLoadingCards(false));
    } catch (e) {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
      dispatch(setErrorCards(error));
    }
  };
export const addCardTC = (
  cardsPack_id: string, question: string, answer: string,
  pageCount: number, page: number
): ThunkType<ActionsCardsType> =>
  async (dispatch) => {
    try {
      dispatch(setLoadingCards(true));
      await cardsApi.addCard(
        { cardsPack_id, question, answer }
      );
      await dispatch(getCardsTC(cardsPack_id, pageCount, page));
      dispatch(setLoadingCards(false));
    } catch (e) {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
      dispatch(setErrorCards(error));
    }
  };
export const updateCardTC = (
  _id: string, question: string, answer: string,
  cardsPack_id: string, pageCount: number, page: number
): ThunkType<ActionsCardsType> =>
  async (dispatch) => {
    try {
      dispatch(setLoadingCards(true));
      await cardsApi.updatedCard(
        { _id, question, answer }
      );
      await dispatch(getCardsTC(cardsPack_id, pageCount, page));
      dispatch(setLoadingCards(false));
    } catch (e) {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
      dispatch(setErrorCards(error));
    }
  };
export const updateGradeCardTC = (
  cardsPack_id: string, card_id: string, grade: number
): ThunkType<ActionsCardsType> =>
  async (dispatch) => {
    try {
      dispatch(setLoadingCards(true));
      await cardsApi.updatedGradeCard(
        { grade, card_id }
      );
      await dispatch(getCardsTC(cardsPack_id));
      dispatch(setLoadingCards(false));
    } catch (e) {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
      dispatch(setErrorCards(error));
    }
  };
export const deleteCardTC = (
  cardId: string, cardsPack_id: string,
  pageCount: number, page: number
): ThunkType<ActionsCardsType> =>
  async (dispatch) => {
    try {
      dispatch(setLoadingCards(true));
      await cardsApi.deleteCard(cardId);
      await dispatch(getCardsTC(cardsPack_id, pageCount, page));
      dispatch(setLoadingCards(false));
    } catch (e) {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
      dispatch(setErrorCards(error));
    }
  };

/** Types */
export type StateType = {
  cards: CardsType[];
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  loading: boolean;
  error: string;
};

export type ActionsCardsType =
    ReturnType<typeof setLoadingCards>
  | ReturnType<typeof setCards>
  | ReturnType<typeof setErrorCards>
