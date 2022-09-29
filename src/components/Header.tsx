import React, { FC } from 'react';
import styles from 'styles/components/Header.module.scss';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';

const Header: FC = () => {
  return (
    <header className={styles._}>
      <Logo className={styles.logo} />
      <h2 className={styles.title}>App Title</h2>
    </header>
  );
};

export default Header;
