import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AppState, useAppDispatch, useAppSelector } from '../store/store';
import { signup } from '../store/auth/auth.slice';
import Logo from '../components/logo';
import { toast } from 'react-toastify';
import { FormattedMessage, useIntl } from 'react-intl';
import { ImSpinner9 } from 'react-icons/im';

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
  const { isLoading, isSuccess, isError, message } = useAppSelector((state: AppState) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (cookie.user) {
      navigate('/main');
    }
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
    // console.log('signUp payload', payload);
    payload.token && setCookie('user', payload.token, {
      maxAge: 200,
      sameSite: 'lax',
    });
    // console.log('sign up cookie', getCookie('user'));
  };

  const intl = useIntl();
  const placeholderLog = intl.formatMessage({ id: 'placeholderSignInLog' });
  const placeholderName = intl.formatMessage({ id: 'placeholderSignUpName' });
  const placeholderPas = intl.formatMessage({ id: 'placeholderSignInPas' });

  if (isLoading) {
    return <div className='h-full my-auto flex justify-center items-center'>
      <ImSpinner9 className='spinner' />
    </div>
  }

  return (
    <section className="w-full h-full my-auto px-6 py-6 flex flex-col justify-center items-center gap-16">
      <div className="w-full flex flex-col justify-center items-center gap-3">
        <Logo />
        <p className="text-center font-bold text-2xl text-gray-400">
          <FormattedMessage id="enterSignUp" />
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="w-1/4 flex flex-col justify-center items-center gap-6"
      >
        <div className="w-full">
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder={placeholderName}
            onChange={onChange}
            required
            className="bg-transparent inline-flex w-full items-center px-4 py-3 border border-solid border-slate-400 rounded-lg"
          />
        </div>
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
            className="inline-flex w-full bg-transparent items-center px-4 py-3 border border-solid border-slate-400 rounded-lg"
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className={`w-full bg-slate-blue border-2 border-slate-blue rounded-md flex items-center justify-center text-white text-lg px-2 py-1 transition-all active:bg-transparent active:text-black`}
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
