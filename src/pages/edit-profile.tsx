import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '../store/store';
import { getUserById, resetUser, updateUserProfile, deleteUser } from '../store/user/userSlice';
import { reset } from '../store/auth/authSlice';
import Spinner from '../components/spinner';
import ConfirmationModal from '../components/edit-profile/confirmation-modal';
import { TokenProps } from '../components/interfaces';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode";
import { FormattedMessage, useIntl } from 'react-intl'

type Props = {};

const EditProfile = (props: Props) => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading, isError, message, userDetails } = useSelector(
    (state: AppState) => state.user
  );
  
  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  const decodedUser: TokenProps = jwt_decode(cookie.user);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!userDetails.name || !userDetails.login) {
      dispatch(getUserById(decodedUser.userId));
    } else if (userDetails.name || userDetails.login) {
      setName(userDetails.name);
      setLogin(userDetails.login);
    }
  }, [isError, message, dispatch, decodedUser.userId, userDetails.name, userDetails.login]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: decodedUser.userId, name, login, password }));
      toast.success('User updated successfully');
    }
  };

  const onDeleteUser: React.MouseEventHandler<HTMLButtonElement> = () => {
    setShowModal(false);
    dispatch(deleteUser(decodedUser.userId));
    toast.success('User deleted successfully');
    removeCookie('user');
    dispatch(reset());
    dispatch(resetUser());
    navigate('/');
  }

  const intl = useIntl();
  const placeholderLog = intl.formatMessage({id: 'placeholderSignInLog'});
  const placeholderPas = intl.formatMessage({id: 'placeholderSignInPas'});
  const placeholderName = intl.formatMessage({id: 'placeholderSignUpName'});
  const placeholderConfirm = intl.formatMessage({id: 'placeholderConfirm'});

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="edit-profile-page w-full h-screen px-6 py-6 flex flex-col justify-center items-center gap-16 bg-slate-800 text-white">
      <p className="title text-center font-bold text-3xl text-white">
        <FormattedMessage id='editTitle' />
      </p>
      <form onSubmit={onSubmit} className="w-1/2 form flex flex-col justify-center items-center gap-4 text-black">
        <div className="w-full form__first-group flex flex-row gap-6">
          <div className="form__item w-full flex flex-col gap-2">
            <label htmlFor="name" className="text-white"><FormattedMessage id='name' /></label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder={placeholderName}
              onChange={event => setName(event.target.value)}
              required
              className="form__control inline-flex w-full items-center px-4 py-3 border border-solid border-slate-400 rounded-lg"
            />
          </div>
          <div className="form__item w-full flex flex-col gap-2">
            <label htmlFor="login" className="text-white"><FormattedMessage id='login' /></label>
            <input
              type="text"
              id="login"
              name="login"
              value={login}
              placeholder={placeholderLog}
              onChange={event => setLogin(event.target.value)}
              required
              className="form__control inline-flex w-full items-center px-4 py-3 border border-solid border-slate-400 rounded-lg"
            />
          </div>
        </div>
        <div className="w-full form__second-group flex flex-row gap-6">
          <div className="form__item w-full flex flex-col gap-2">
            <label htmlFor="password" className="text-white"><FormattedMessage id='password' /></label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder={placeholderPas}
              onChange={event => setPassword(event.target.value)}
              required
              className="form__control inline-flex w-full items-center px-4 py-3 border border-solid border-slate-400 rounded-lg"
            />
          </div>
          <div className="form__item w-full flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-white"><FormattedMessage id='confirm' /></label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              placeholder={placeholderConfirm}
              onChange={event => setConfirmPassword(event.target.value)}
              required
              className="form__control inline-flex w-full items-center px-4 py-3 border border-solid border-slate-400 rounded-lg"
            />
          </div>
        </div>
        <div className="form__buttons w-full flex justify-center gap-4 mt-4">
          <button 
            onClick={() => setShowModal(true)}
            className="form__button w-full px-4 py-2 text-lg border-transparent rounded-md shadow-md font-medium text-white bg-red-600 hover:bg-red-800 transition-all duration-200"
          >
            <FormattedMessage id='deleteProfile' />
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="form__button w-full px-4 py-2 text-lg border-transparent rounded-md shadow-md font-medium text-indigo-600 bg-white hover:bg-slate-200 transition-all duration-200"
          >
            <FormattedMessage id='cancel' />
          </button>
          <button
            type="submit"
            className="form__button w-full px-4 py-2 text-lg border-transparent rounded-md shadow-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
          >
            <FormattedMessage id='update' />
          </button>
        </div>
      </form>
      { showModal ? (<ConfirmationModal showModal={showModal} setShowModal={setShowModal} onDeleteUser={onDeleteUser} />) : null }
    </section>
  );
};

export default EditProfile;