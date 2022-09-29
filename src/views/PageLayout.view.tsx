import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from 'styles/views/PageLayout.module.scss';
import Header from 'components/Header';
import Footer from 'components/Footer';

const PageLayout: FC = () => {
  return (
    <>
      <div className={styles._}>
        <Header />
        <main className={styles.page}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PageLayout;
