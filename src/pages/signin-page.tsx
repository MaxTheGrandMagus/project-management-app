import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { AppState, useAppDispatch } from '../store/store';
import { signin, reset } from '../store/auth/auth.slice';
import Logo from '../components/logo';
import Spinner from '../components/spinner';
import { themes } from '../components/main/board-button';
import { toast } from 'react-toastify';
import { FormattedMessage, useIntl } from 'react-intl';

type Props = {};

const SigninPage = (props: Props) => {
  const [cookie, setCookie] = useCookies(['user']);

  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const { login, password } = formData;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (cookie.user) {
      // console.log('sign in cookie', cookie.user);
      navigate('/main');
    }
    dispatch(reset());
  }, [cookie.user, isLoading, isSuccess, isError, message, navigate, dispatch]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const userData = {
      login,
      password,
    };
    const { payload } = await dispatch(signin(userData));
    payload.token &&
      setCookie('user', payload.token, {
        maxAge: 36000,
        sameSite: 'lax',
      });
  };

  const intl = useIntl();
  const placeholderLog = intl.formatMessage({ id: 'placeholderSignInLog' });
  const placeholderPas = intl.formatMessage({ id: 'placeholderSignInPas' });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="w-full h-full my-auto bg-white flex flex-col justify-center items-center gap-16 px-6 py-6">
      <div className="w-full flex flex-col justify-center items-center gap-3">
        <Logo />
        <p className="text-center font-bold text-2xl text-gray-400">
          <FormattedMessage id="enterAccount" />
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="w-1/4 flex flex-col justify-center items-center gap-6"
      >
        <div className="w-full">
          <input
            type="text"
            id="login"
            name="login"
            value={login}
            placeholder={placeholderLog}
            onChange={onChange}
            required
            className="inline-flex bg-transparent w-full items-center px-4 py-3 border border-solid border-slate-400 rounded-lg"
          />
        </div>
        <div className="w-full">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder={placeholderPas}
            onChange={onChange}
            required
            className="inline-flex bg-transparent w-full items-center px-4 py-3 border border-solid border-slate-400 rounded-lg"
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className={`w-full bg-slate-blue border-2 border-slate-blue rounded-md flex items-center justify-center text-white text-lg px-2 py-1 transition-all active:bg-transparent active:text-black`}
          >
            <FormattedMessage id="signIn" />
          </button>
        </div>
      </form>
      <div className="have-account text-gray-400 w-full flex justify-center items-center">
        <span>
          <FormattedMessage id="dontHaveAccount" />
          &nbsp;
        </span>
        <Link
          to="/signup"
          className="text-sky-400 hover:text-indigo-500 transition-all duration-200"
        >
          <FormattedMessage id="signUp" />
        </Link>
      </div>
    </section>
  );
};

export default SigninPage;
