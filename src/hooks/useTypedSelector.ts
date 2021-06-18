import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootStateType } from 'src/main/bll/store';

export const useTypedSelector: TypedUseSelectorHook<RootStateType> = useSelector;
