export interface IFormSection {
  name: string;
  order: number;
  fields: IFormField[];
}

export type FormSubmitEvent = Event<HTMLFormElement>;
