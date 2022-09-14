import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header, { HeaderProps } from './header';
import Footer from './footer';
import { useState } from 'react';
import { LOCALES } from '../i18n/locales';

const Layout = ({ handleChange, currentLocale }: HeaderProps) => {
  const [cookie] = useCookies(['user']);
  // const locale = LOCALES.ENGLIS/H

  return (
    <div className="min-h-screen flex flex-col gap-4 bg-slate-800">
      {cookie.user && (
        <Header
          handleChange={handleChange}
          currentLocale={currentLocale}
        />
      )}
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Layout;
