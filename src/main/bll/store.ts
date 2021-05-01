import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  Middleware,
  Action,
} from 'redux';
import thunk, { ThunkAction, ThunkMiddleware } from 'redux-thunk';

import { DEV } from '../../config';
import { loginReducer as login } from '../../pages/login/bll/loginReducer';
import { registrationReducer as register } from '../../pages/registration/bll/registrationReducer';
import { recoveryPassReducer as recoveryPass } from '../../pages/recoveryPass/bll/recoveryPassReducer';
import { setPassReducer as setPass } from '../../pages/setPass/bll/setPassReducer';
import { profileReducer as profile } from '../../pages/profile/bll/profileReducer';
import { packsReducer as packs } from '../../pages/packs/bll/PacksReducer';
import { cardsReducer as cards } from '../../pages/cards/bll/CardsReducer';

const rootReducer = combineReducers({
  login,
  register,
  recoveryPass,
  setPass,
  profile,
  packs,
  cards
});

// @ts-ignore next line
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = DEV && devtools ? devtools : compose;

const middleware: Array<Middleware> = [thunk as ThunkMiddleware<RootStateType>];

export const enhancedStore = composeEnhancers(applyMiddleware(...middleware));

export const store = createStore(rootReducer, enhancedStore);

/** Types */
export type RootStateType = ReturnType<typeof rootReducer>;

export type InferActionsType<T> = T extends Record<string,
    (...args: never[]) => infer U>
  ? U
  : never;

export type ThunkType<A extends Action = Action,
  R = Promise<void>,
  S = RootStateType> = ThunkAction<R, S, unknown, A>;

if (DEV) {
  // @ts-ignore next line
  window.store = store;
}
