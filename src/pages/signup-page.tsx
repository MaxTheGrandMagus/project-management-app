import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useAppDispatch } from '../store/store';
import { signup, reset } from '../store/auth/authSlice';
import Spinner from '../components/spinner';
import Logo from '../components/logo';
import { themes } from '../components/main-route/board-button';
import { getCookie } from '../helpers/cookie';
import { toast } from 'react-toastify';
import { FormattedMessage, useIntl } from 'react-intl';

type Props = {};

const SignupPage = (props: Props) => {
  const [cookie, setCookie] = useCookies(['user']);

  const [formData, setFormData] = useState({
    name: '',
    login: '',
    password: '',
  });
  const { name, login, password } = formData;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (cookie.user) {
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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      name,
      login,
      password,
    };
    const { payload } = await dispatch(signup(userData));
    console.log('signUp payload', payload);
    payload.token && setCookie('user', payload.token, {
      maxAge: 200,
      sameSite: 'lax',
    });
    console.log('sign up cookie', getCookie('user'));
  };

  const intl = useIntl();
  const placeholderLog = intl.formatMessage({ id: 'placeholderSignInLog' });
  const placeholderName = intl.formatMessage({ id: 'placeholderSignUpName' });
  const placeholderPas = intl.formatMessage({ id: 'placeholderSignInPas' });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="signup-page w-full min-h-[80vh] px-6 py-6 flex flex-col justify-center items-center gap-16">
      <div className="logo__container w-full flex flex-col justify-center items-center gap-3">
        <Logo />
        <p className="title text-center font-bold text-2xl text-gray-400">
          <FormattedMessage id="enterSignUp" />
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="form w-1/4 flex flex-col justify-center items-center gap-6"
      >
        <div className="form__item w-full">
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder={placeholderName}
            onChange={onChange}
            required
            className="form__control bg-gray-600 inline-flex w-full items-center px-4 py-3 border border-solid border-slate-400 rounded-lg"
          />
        </div>
        <div className="form__item w-full">
          <input
            type="text"
            id="login"
            name="login"
            value={login}
            placeholder={placeholderLog}
            onChange={onChange}
            required
            className="form__control inline-flex bg-gray-600 w-full items-center px-4 py-3 border border-solid border-slate-400 rounded-lg"
          />
        </div>
        <div className="form__item w-full">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder={placeholderPas}
            onChange={onChange}
            required
            className="form__control inline-flex w-full bg-gray-600 items-center px-4 py-3 border border-solid border-slate-400 rounded-lg"
          />
        </div>
        <div className="form__item w-full flex justify-center">
          <button
            type="submit"
            className={`${themes.light} border-2 w-full rounded-md flex items-center justify-center border-sky-400`}
          >
            <FormattedMessage id="signUp" />
          </button>
        </div>
      </form>
      <div className="have-account w-full text-gray-400 flex justify-center items-center">
        <span>
          <FormattedMessage id="haveAccount" />
          &nbsp;
        </span>
        <Link
          to="/signin"
          className="text-sky-400 hover:text-indigo-500 transition-all duration-200"
        >
          <FormattedMessage id="signIn" />
        </Link>
      </div>
    </section>
  );
};

export default SignupPage;
