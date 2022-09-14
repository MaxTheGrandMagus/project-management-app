import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Logo from '../components/logo';
import { FormattedMessage } from 'react-intl';

const WelcomePage = () => {
  const [cookie] = useCookies(['user']);

  return (
    <main className="relative bg-slate-800 min-h-[80vh] items-center text-gray-300 justify-center flex flex-col gap-5 ">
      <nav className=" flex gap-5 absolute top-20 right-20 ">
        {cookie.user === undefined && (
          <>
            <Link
              to="/signin"
              className="border-2 border-sky-400 rounded p-1 bg-gradient-to-r from-sky-500 to-sky-700 "
            >
              <FormattedMessage id="signIn" />
            </Link>
            <Link
              to="/signup"
              className="border-2 border-sky-400 rounded p-1 bg-gradient-to-r from-sky-500 to-sky-700 "
            >
              <FormattedMessage id="signUp" />
            </Link>
          </>
        )}
        {cookie.user && (
          <Link
            to="/main"
            className="border-2 border-sky-400 rounded p-1 bg-gradient-to-r from-sky-500 to-indigo-500 "
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
