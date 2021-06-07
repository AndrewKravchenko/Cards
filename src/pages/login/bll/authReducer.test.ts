import { authReducer, setUser, StateType } from './authReducer';

const state: StateType = {
  user: {
    _id: '',
    email: '',
    name: '',
    publicCardPacksCount: 0, // количество колод

    created: new Date(),
    updated: new Date(),
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,
    error: '',
    avatar: ''
  },
  loading: false,
  success: false,
  error: '',
  isInitial: false
};

it('user data must be changed', () => {
  // 1. test data
  let action = setUser({
    _id: '1',
    created: new Date(),
    email: 'tommy@mail.ru',
    isAdmin: false,
    name: 'Tom',
    publicCardPacksCount: 0,
    rememberMe: true,
    updated: new Date(),
    verified: true,
    error: 'Error',
    avatar: ''
  })
  // 2. action
  let newState = authReducer(state, action)
  // 3. expectation
  expect(newState.user._id).toBe('1')
  expect(newState.user.email).toBe('tommy@mail.ru')
  expect(newState.user.name).toBe('Tom')
  expect(newState.user.rememberMe).toBe(true)
  expect(newState.user.verified).toBe(true)
  expect(newState.user.error).toBe('Error')
  expect(newState.user.avatar).toBe('')
})