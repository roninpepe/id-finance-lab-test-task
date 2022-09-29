import { IFormField, IFormSection } from 'types/_';

/* main */

export interface IElementProps {
  className?: string;
  key?: string;
}

export interface IFormResponse {
  [key: string]: string | string[];
}

/* context */
export interface IFormContext {
  setValue: (value: Record<string, string | string[]>) => void;
  response?: IFormResponse;
}

/* props */

export interface IFormFieldProps extends IElementProps {
  params: IFormField;
}
export interface IFormSectionProps extends IElementProps {
  section: IFormSection;
}
export interface IFormProps extends IElementProps {
  data: IFormSection[];
  title?: string;
  id?: string;
}
export interface IFormModalProps extends IElementProps {
  closeModal: () => void;
  response: IFormResponse;
  data: IFormSection[];
}
