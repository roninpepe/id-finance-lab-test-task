import { createContext } from 'react';
import { IFormContext } from 'types/_';

export const FormContext = createContext<IFormContext>({
  setValue: (value: Record<string, string | string[]>) => {},
});
