import { DataNormalizer, IFormField, IFormSchema, IFormSection } from 'types/_';
import { mergeNestedObjects, mergeObjects } from 'utils/utils';

import data from 'data/registrationForm.json';

const registrationFormSectionsParams: Partial<IFormSection>[] = [
  { name: 'SignUpInfo', order: 0 },
  { name: 'PersonalInfo', order: 1 },
];

const registrationFormFieldsParams: IFormSchema = {
  mobilePhone: {
    section: 'SignUpInfo',
    order: 0,
    fieldLabel: 'Mobile Phone',
    placeholder: '+375123456789',
  },
  email: {
    section: 'SignUpInfo',
    order: 1,
    fieldLabel: 'Email',
    type: 'email',
    placeholder: 'example@mail.com',
  },
  password: {
    section: 'SignUpInfo',
    order: 2,
    fieldLabel: 'Password',
    type: 'password',
  },
  firstName: {
    section: 'PersonalInfo',
    order: 0,
    fieldLabel: 'First Name',
  },
  lastName: {
    section: 'PersonalInfo',
    order: 1,
    fieldLabel: 'Last Name',
  },
  sex: {
    section: 'PersonalInfo',
    order: 2,
    fieldLabel: 'Sex',
    type: 'radio',
    oneOf: ['Male', 'Female', 'Other'],
  },
  birthday: {
    section: 'PersonalInfo',
    order: 3,
    fieldLabel: 'Birthday',
    type: 'date',
  },
  ocean: {
    section: 'PersonalInfo',
    order: 4,
    fieldLabel: 'Your Favorite Ocean',
    type: 'select',
  },
  hobby: {
    section: 'PersonalInfo',
    order: 5,
    fieldLabel: 'Hobby',
    type: 'checkbox',
  },
};

const normalizeRegistrationFormData: DataNormalizer<
  IFormSchema,
  IFormSection[]
> = (formData) => {
  const res: IFormSection[] = [];

  const formFields: IFormField[] = Object.entries(formData).map(
    (field: [string, IFormField]): IFormField => {
      return {
        ...field[1],
        fieldLabel: field[1].fieldLabel ?? field[0],
        fieldName: field[1].fieldName ?? field[0],
      };
    }
  );

  formFields.forEach((field: IFormField): void => {
    const existedSection = res.find(
      (section) => section.name === field.section
    );
    if (existedSection) {
      existedSection.fields.push(field);
    } else
      res.push({
        name: field.section ?? 'Other',
        order: field.section ? res.length : Infinity,
        fields: [field],
      });
  });

  return res
    .map((v: IFormSection): IFormSection => {
      const existedSection = registrationFormSectionsParams.find(
        (x: Partial<IFormSection>) => x.name === v.name
      );
      return existedSection ? mergeObjects(v, existedSection) : v;
    })
    .sort((a: IFormSection, b: IFormSection) => a.order - b.order);
};

export const registrationFormSections: IFormSection[] =
  normalizeRegistrationFormData(
    mergeNestedObjects(data, registrationFormFieldsParams)
  );
