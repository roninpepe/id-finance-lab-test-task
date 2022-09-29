import React, { FC } from 'react';
import { IFormSectionProps } from 'types/_';
import styles from 'styles/components/Form.module.scss';
import FormField from './Field';

const FormSection: FC<IFormSectionProps> = (props) => {
  const { name, fields } = props.section;
  return (
    <div className={styles.section}>
      <h3 className={styles['section-title']}>{name}</h3>
      <div className={styles['section-items']}>
        {fields.map((v, i) => (
          <FormField key={`field-${i}`} params={v} />
        ))}
      </div>
    </div>
  );
};

export default FormSection;
