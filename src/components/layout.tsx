import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header, { HeaderProps } from './header/header';
import Footer from './footer/footer';

const Layout = ({ handleChange, currentLocale }: HeaderProps) => {
  const [cookie] = useCookies(['user']);

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
