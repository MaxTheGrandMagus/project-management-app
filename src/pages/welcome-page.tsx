import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Logo from '../components/logo';
import { FormattedMessage } from 'react-intl';
import { SiAuth0 } from 'react-icons/si'
import { FiLogIn } from 'react-icons/fi'

const WelcomePage = () => {
  const [cookie] = useCookies(['user']);

  return (
    <main className="relative bg-white min-h-[75vh] my-auto items-center text-black justify-center flex flex-col gap-5 ">
      <nav className=" flex gap-5 absolute top-10 right-20 ">
        {cookie.user === undefined && (
          <>
            <Link
              to="/signin"
              className="flex flex-row justify-center items-center gap-2 bg-slate-blue border-2 border-slate-blue rounded p-2 text-white text-lg active:bg-white active:text-slate-blue transition-all"
            >
              <FormattedMessage id="signIn" />
              <FiLogIn size={20} />
            </Link>
            <Link
              to="/signup"
              className="flex flex-row justify-center items-center gap-2 bg-slate-blue border-2 border-slate-blue rounded p-2 text-white text-lg active:bg-white active:text-slate-blue transition-all"
            >
              <FormattedMessage id="signUp" />
              <SiAuth0 size={20} />
            </Link>
          </>
        )}
        {cookie.user && (
          <Link
            to="/main"
            className="bg-slate-blue border-2 border-slate-blue rounded p-2 text-white text-lg"
          >
            Go to Main Page
          </Link>
        )}
      </nav>
      <Logo />
      <p className="text-lg">
        <FormattedMessage id="nameProject" />
      </p>
    </main>
  );
};

export default WelcomePage;
