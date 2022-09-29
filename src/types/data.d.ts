export interface IFormField {
  fieldLabel?: string;
  fieldName?: string;
  required?: boolean;
  minLength?: string;
  maxLength?: string;
  minAge?: string;
  maxAge?: string;
  regExp?: string;
  oneOf?: string[];
  anyOf?: string[];
  type?: string;
  order?: number;
  placeholder?: string;
  section?: string;
}

export interface IFormSchema {
  [key: string]: IFormField;
}
