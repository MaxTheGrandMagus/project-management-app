import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AppState, useAppDispatch, useAppSelector } from '../store/store';
import { signin } from '../store/auth/auth.slice';
import Logo from '../components/logo';
import { toast } from 'react-toastify';
import { FormattedMessage, useIntl } from 'react-intl';
import { ImSpinner9 } from 'react-icons/im';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {};

interface ISignInForm {
  login: string;
  password: string;
}

const SigninPage = (props: Props) => {
  const [cookie, setCookie] = useCookies(['user']);

  const { register, handleSubmit, reset, formState: { errors }} = useForm<ISignInForm>({
    resolver: yupResolver(
      Yup.object().shape({
        login: Yup.string()
          .required(useIntl().formatMessage({ id: 'errorLoginRequired' }))
          .min(3, useIntl().formatMessage({ id: 'errorLoginMinLength' }))
          .max(64, useIntl().formatMessage({ id: 'errorLoginMaxLength' })),
        password: Yup.string()
          .required(useIntl().formatMessage({ id: 'errorPasswordRequired' }))
          .min(6, useIntl().formatMessage({ id: 'errorPasswordMinLength' }))
          .max(128, useIntl().formatMessage({ id: 'errorPasswordMaxLength' })),
      })
    ),
  });

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

  const handleFormSubmit: SubmitHandler<ISignInForm> = async (data: ISignInForm) => {
    const { payload } = await dispatch(signin(data));
    payload.token && setCookie('user', payload.token, {
      maxAge: 36000,
      sameSite: 'lax',
    });
    reset();
  };

  const placeholderLog = useIntl().formatMessage({ id: 'placeholderSignInLog' });
  const placeholderPas = useIntl().formatMessage({ id: 'placeholderSignInPas' });

  if (isLoading) {
    return <div className='h-full my-auto flex justify-center items-center'>
      <ImSpinner9 className='spinner' />
    </div>
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
        className="w-1/4 flex flex-col justify-center items-center gap-6"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="w-full flex flex-col">
          <input
            {...register('login')}
            type="text"
            id="login"
            name="login"
            placeholder={placeholderLog}
            className={`
              ${errors.login && 'border-2 border-solid border-red-400'}
              focus:outline-none focus:outline-offset-0 focus:outline-slate-blue focus:border-transparent inline-flex bg-transparent w-full items-center px-4 py-3 border border-solid border-slate-400 rounded-lg
            `}
          />
          {errors.login && <p className="text-red-400 mt-1">{errors.login.message}</p>}
        </div>
        <div className="w-full flex flex-col">
          <input
            {...register('password')}
            type="password"
            id="password"
            name="password"
            placeholder={placeholderPas}
            className={`
              ${errors.password && 'border-2 border-solid border-red-400'}
              focus:outline-none focus:outline-offset-0 focus:outline-slate-blue focus:border-transparent inline-flex w-full bg-transparent items-center px-4 py-3 border border-solid border-slate-400 rounded-lg
            `}
          />
          {errors.password && <p className="text-red-400 mt-1">{errors.password.message}</p>}
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
