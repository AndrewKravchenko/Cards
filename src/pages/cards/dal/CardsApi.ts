import {API} from "src/main/dal/api";

export const cardsApi = {
    getCards({cardsPack_id, pageCount, page}: CardsRequestDataType) {
        return API.get<CardsResponseDataType>(
            `cards/card`, {params: {cardsPack_id, pageCount, page}})
            .then(response => response.data);
    },
    addCard({cardsPack_id, question, answer}: CardAddRequestDataType) {
        return API.post(
            `cards/card`, {card: {cardsPack_id, question, answer}})
            .then(response => response.data);
    },
    updatedCard({_id, question, answer}: CardRequestUpdateDataType) {
        return API.put(`cards/card`, {card: {_id, question, answer}})
            .then(response => response.data);
    },
    updatedGradeCard({grade, card_id}: GradeCardRequestUpdateDataType) {
        return API.put<GradeCardResponseUpdateDataType>(
            `cards/grade`, {grade, card_id})
            .then(response => response.data);
    },
    deleteCard(cardId: string) {
        return API.delete(`cards/card`, {params: {id: cardId}})
            .then(response => response.data);
    },
};
export type GradeCardRequestUpdateDataType = {
    card_id: string
    grade: number
}
export type GradeCardResponseUpdateDataType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}
export type CardRequestUpdateDataType = {
    _id: string
    question?: string
    answer?: string
    comments?: string
}
type CardsRequestDataType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: number
    page?: number
    pageCount?: number
}

export type CardsResponseDataType = {
    cards: CardsType[];
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    user_id: string
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
    __v: number
    _id: string
}
export type CardAddRequestDataType = {
    cardsPack_id: string
    question: string
    answer: string
    grade?: 0 // 0..5, не обязателен
    shots?: 0 // не обязателен
    rating?: 0 // не обязателен
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
}
