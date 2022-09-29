import React, { FC } from 'react';
import { IFormModalProps } from 'types/_';
import styles from 'styles/components/Form.module.scss';

const FormModal: FC<IFormModalProps> = (props) => {
  const { closeModal, response, data } = props;

  const entries = Object.entries(response);

  return (
    <div className={styles.modal}>
      <div className={styles['modal-close-area']} onClick={closeModal}></div>
      <div className={styles['modal-wrapper']}>
        <div className={styles['modal-container']}>
          <h3 className={styles['modal-header']}>Your info</h3>
          <div className={styles['modal-items']}>
            {entries.map((v, i) => (
              <div className={styles['modal-item']} key={`item-${i}`}>
                <b>
                  {data
                    .map((x) => x.fields)
                    .flat(1)
                    .find((x) => x.fieldName === v[0])?.fieldLabel ?? v[0]}
                  :
                </b>{' '}
                {Array.isArray(v[1]) ? v[1].join(', ') : v[1]}
              </div>
            ))}
          </div>
          <button className={styles.button} onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
