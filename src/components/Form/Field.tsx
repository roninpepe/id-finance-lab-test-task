import React, { FC, useContext, useEffect, useState } from 'react';
import { IFormFieldProps } from 'types/_';
import styles from 'styles/components/Form.module.scss';
import { getAgeLimit } from 'helpers/Form.helper';
import { FormContext } from './Context';
import { toggleArrayValue } from 'utils/utils';

const FormField: FC<IFormFieldProps> = (props) => {
  const {
    fieldLabel,
    fieldName,
    type,
    required,
    regExp,
    placeholder,
    anyOf,
    oneOf,
    minLength,
    maxLength,
    minAge,
    maxAge,
  } = props.params;
  const { setValue, response } = useContext(FormContext);
  const inputType = type
    ? type
    : anyOf
    ? 'checkbox'
    : oneOf
    ? 'select'
    : 'text';

  const [fieldValue, setFieldValue] = useState<string | string[]>(
    fieldName && response && fieldName in response
      ? response[fieldName]
      : inputType === ('checkbox' || 'radio')
      ? []
      : ''
  );
  const [isRequired, setIsRequired] = useState(required && !fieldValue.length);

  const passwordField = (
    <>
      <div className={styles.field}>
        <label className={styles['field-label']} htmlFor={fieldName}>
          {fieldLabel}
        </label>
        <input
          value={fieldValue}
          type={'password'}
          id={fieldName}
          required={required}
          pattern={regExp}
          placeholder={placeholder}
          autoComplete="false"
          minLength={minLength ? Number(minLength) : undefined}
          maxLength={maxLength ? Number(maxLength) : undefined}
          onChange={(e) => {
            setFieldValue(e.target.value);
          }}
        />
      </div>
      <div className={styles.field}>
        <label
          className={styles['field-label']}
          htmlFor={`${fieldName}Confirm`}
        >
          {`Repeat ${fieldLabel}`}
        </label>
        <input
          type={'password'}
          id={`${fieldName}Confirm`}
          required
          pattern={regExp}
          placeholder={placeholder}
          minLength={minLength ? Number(minLength) : undefined}
          maxLength={maxLength ? Number(maxLength) : undefined}
          onChange={(e) =>
            e.target.value === fieldValue
              ? e.target.setCustomValidity('')
              : e.target.setCustomValidity(`${fieldLabel}s should be same.`)
          }
        />
      </div>
    </>
  );
  const selectField = (
    <div className={styles.field}>
      <label className={styles['field-label']} htmlFor={fieldName}>
        {fieldLabel}
      </label>
      <select
        id={fieldName}
        required={required}
        defaultValue={fieldValue ? fieldValue : '__PLACEHOLDER__'}
        onChange={(e) => {
          setFieldValue(e.target.value);
        }}
      >
        <option disabled value={'__PLACEHOLDER__'}>
          {placeholder}
        </option>
        {oneOf?.map((v, i) => (
          <option key={`option-${i}`} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
  const checkboxField = (
    <div className={styles.field}>
      <label className={styles['field-label']} htmlFor={fieldName}>
        {fieldLabel}
      </label>
      <div className={styles['field-group']}>
        {anyOf?.map((v, i) => (
          <div className={styles['field-option']} key={`option-${i}`}>
            <input
              className={styles['field-input']}
              hidden
              type="checkbox"
              id={`${fieldName}_${v}`}
              value={v}
              name={fieldName}
              required={isRequired}
              checked={fieldValue.includes(v)}
              onChange={async (e) => {
                if (Array.isArray(fieldValue))
                  setFieldValue(toggleArrayValue(fieldValue, e.target.value));
              }}
            />
            <label
              htmlFor={`${fieldName}_${v}`}
              className={styles['field-option-label']}
            >
              {v}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
  const radioField = (
    <div className={styles.field}>
      <label className={styles['field-label']} htmlFor={fieldName}>
        {fieldLabel}
      </label>
      <div className={styles['field-group']}>
        {oneOf?.map((v, i) => (
          <div className={styles['field-option']} key={`option-${i}`}>
            <input
              className={styles['field-input']}
              hidden
              type="radio"
              id={`${fieldName}_${v}`}
              value={v}
              name={fieldName}
              required={required && !i}
              checked={fieldValue.includes(v)}
              onChange={(e) => {
                setFieldValue(e.target.value);
              }}
            />
            <label
              htmlFor={`${fieldName}_${v}`}
              className={styles['field-option-label']}
            >
              {v}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
  const textField = (
    <div className={styles.field}>
      <label className={styles['field-label']} htmlFor={fieldName}>
        {fieldLabel}
      </label>
      <input
        value={fieldValue}
        type={inputType}
        id={fieldName}
        required={required}
        pattern={regExp}
        placeholder={placeholder}
        minLength={minLength ? Number(minLength) : undefined}
        maxLength={maxLength ? Number(maxLength) : undefined}
        max={minAge ? getAgeLimit(minAge) : undefined}
        min={maxAge ? getAgeLimit(maxAge) : undefined}
        onChange={(e) => {
          setFieldValue(e.target.value);
        }}
      />
    </div>
  );

  useEffect(() => {
    if (fieldName) setValue({ [fieldName]: fieldValue });
    setIsRequired(required && !fieldValue.length);
  }, [fieldValue]);

  console.log(fieldValue);

  return inputType === 'password'
    ? passwordField
    : inputType === 'select'
    ? selectField
    : inputType === 'checkbox'
    ? checkboxField
    : inputType === 'radio'
    ? radioField
    : textField;
};

export default FormField;
