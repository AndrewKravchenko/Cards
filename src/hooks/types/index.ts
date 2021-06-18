import { ChangeEvent } from 'react';
import { useInput } from 'src/hooks/ValidationFormAndrew';

export type HookInputType = ReturnType<typeof useInput>

export type ReturnUseInputValueType<T> = [
  T,
  (value: T) => void,
  (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
];
