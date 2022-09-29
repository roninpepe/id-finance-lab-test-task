import React, { FC } from 'react';
import { registrationFormSections } from 'helpers/RegistrationView.helper';
import Form from 'components/Form';

const RegistrationView: FC = () => {
  return (
    <Form
      data={registrationFormSections}
      title="Registration"
      id="registration"
    />
  );
};

export default RegistrationView;
