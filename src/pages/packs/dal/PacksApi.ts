import { API } from 'src/main/dal/api';
import { CardPacksType } from 'src/pages/packs/bll/PacksReducer';

export const packsAPI = {
  getPacks(user_id: string, pageCount: number, page: number) {
    return API.get<CardsPackResponseType>(
      `cards/pack`, { params: {  user_id, pageCount, page } }
    )
      .then(response => response.data);
  },
  addPack(name: string, privat: boolean) {
    return API.post(
      `cards/pack`, { cardsPack: { name, private: privat} }
    )
      .then(response => response.data);
  },
  updatedPacks(name: string, _id: string) {
    return API.put(`cards/pack`, { cardsPack: { name, _id } })
      .then(response => response.data);
  },
  deletePack(id: string) {
    return API.delete(`cards/pack`, { params: {id } })
      .then(response => response.data);
  },
};

export type CardsPackResponseType = {
    cardPacks: CardPacksType[]
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}
