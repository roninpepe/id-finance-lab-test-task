import React, { FC, useEffect, useState } from 'react';
import {
  FormSubmitEvent,
  IFormProps,
  IFormResponse,
  IFormSection,
} from 'types/_';
import styles from 'styles/components/Form.module.scss';
import FormSection from './Form/Section';
import { getForm } from 'helpers/Form.helper';
import { FormContext } from './Form/Context';
import FormModal from './Form/Modal';

const Form: FC<IFormProps> = (props) => {
  const { data, title, id } = props;
  const formId = `${id ?? ''}Form`;

  const [activeSection, setActiveSection] = useState<number>(0);
  const [response, setResponse] = useState<IFormResponse>({});
  const [modalState, setModalState] = useState<boolean>(false);

  useEffect(() => {
    const form = getForm(formId);

    form.onsubmit = (e: FormSubmitEvent): void => {
      e.preventDefault();
    };
  }, []);
  useEffect(() => {
    if (activeSection >= data.length) {
      setModalState(true);
    } else setModalState(false);
  }, [activeSection]);

  return (
    <FormContext.Provider
      value={{
        setValue: (value) => {
          setResponse({ ...response, ...value });
        },
        response: response,
      }}
    >
      <div className={styles._}>
        <div className={styles.indicator}>
          {data.map((section, i) => (
            <div
              className={[
                styles['indicator-item'],
                activeSection >= i
                  ? styles['indicator-item_viewed']
                  : undefined,
                activeSection === i
                  ? styles['indicator-item_active']
                  : undefined,
              ].join(' ')}
              key={`indicator-${i}`}
            />
          ))}
        </div>
        <form className={styles.wrapper} id={formId}>
          <h2 className={styles.title}>{title ?? 'Placeholder form'}</h2>
          <div className={styles.fields}>
            {
              data.map(
                (section: IFormSection, i: number): JSX.Element => (
                  <FormSection key={`section-${i}`} section={section} />
                )
              )[activeSection < data.length ? activeSection : data.length - 1]
            }
          </div>
          <div className={styles.buttons}>
            {activeSection ? (
              <button
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(activeSection - 1);
                }}
              >
                Change{' '}
                {
                  data[
                    activeSection < data.length
                      ? activeSection
                      : data.length - 1
                  ].name
                }
              </button>
            ) : undefined}
            <button
              className={styles.button}
              onClick={() => {
                const form = getForm(formId);
                if (form.checkValidity()) setActiveSection(activeSection + 1);
              }}
            >
              {activeSection < data.length - 1 ? 'Next' : 'Complete'}
            </button>
          </div>
        </form>
      </div>
      {modalState ? (
        <FormModal
          closeModal={() => {
            setActiveSection(data.length - 1);
          }}
          response={response}
          data={data}
        />
      ) : undefined}
    </FormContext.Provider>
  );
};

export default Form;
