import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageLayout from 'views/PageLayout.view';
import RegistrationView from 'views/Registration.view';

const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<RegistrationView />} />
          <Route path="*" element={<RegistrationView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
