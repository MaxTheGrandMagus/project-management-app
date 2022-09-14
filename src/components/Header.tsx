import React, { useState, useEffect, FormEventHandler, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '../store/store';
import { reset } from '../store/auth/authSlice';
import { getUserById, resetUser } from '../store/user/userSlice';
import BoardButton, { themes } from './main-route/board-button';
import BoardCreation from '../pages/create-board';
import jwt_decode from 'jwt-decode'
import { useCookies } from 'react-cookie';
import { TokenProps } from './interfaces';
import userImg from '../assets/images/sample-avatar.jpg';
import Logo from './logo';
import Menu from '../assets/icons/menu';
import { LOCALES } from '../i18n/locales';
// import { FormattedMessage } from 'react-intl'

export type HeaderProps = {
  currentLocale: string,
  handleChange: ({ target: { value } }: {target: {value: string }}) => void,
};

const Header = ({currentLocale, handleChange }: HeaderProps) => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [burger, setBurger] = useState(false);
  const [width, setWidth] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false)

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { userDetails } = useSelector((state: AppState) => state.user);

  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  const decodedUser: TokenProps = jwt_decode(cookie.user)

  // const ref = React.useRef();
  const inputEl = useRef(null);

  const onLogout = () => {
    dispatch(reset());
    dispatch(resetUser());
    removeCookie('user');
    navigate('/');
  };

  const toggleWindow = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!userDetails.name || !userDetails.login) {
      dispatch(getUserById(decodedUser.userId));
    }
    const handleStickyHeader = () => {
      window.scrollY >= 85 ? setSticky(true) : setSticky(false);
    };
    const handleWidthHeader = () => {
      window.innerWidth <= 640 ? setBurger(true) : setBurger(false);
    };
    window.addEventListener('scroll', handleStickyHeader);
    window.addEventListener('resize', handleWidthHeader);
    return () => {
      window.removeEventListener('scroll', handleStickyHeader);
      window.removeEventListener('resize', handleWidthHeader);
    };
  }, [userDetails.name, userDetails.login, dispatch, decodedUser.userId, width]);

  const languages = [
    { name: 'EN', code: LOCALES.ENGLISH },
    { name: 'RU', code: LOCALES.RUSSIAN },
  ]

  const openMenu = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <header className={`${sticky ? 'header--sticky' : 'h-24'} relative bg-slate-800 w-full flex justify-between items-center px-6 py-6 border-b border-b-slate-600 text-gray-300`}>
      <div ref={inputEl} className="logo">
        <Link to="/main">
          <Logo />
        </Link>
      </div>
      <div className='flex justify-between'>
        {
          <div className={`${(burger && isNavOpen)? "hidden" : 'visible'} nav__list z-20  absolute bg-slate-700 p-2 top-12 right-10 flex flex-col justify-between items-center gap-4 sm:bg-slate-800 sm:flex-row sm:static `}>
            <BoardButton themes={themes.light} text="boardCreationBtn" onClick={toggleWindow} />
            <Link to="/edit-profile">
              <BoardButton themes={themes.light} text="edit" />
            </Link>
            <BoardButton
              themes={themes.light}
              text="signOut"
              onClick={onLogout}
            />
            <div className="switch">
              <select className='text-white bg-sky-600 mr-4' onChange={handleChange}  value={currentLocale}>
                {
                  languages.map(({ name, code }) => (
                    <option className='text-white bg-slate-800' key={code}  value={code}>
                      {name}
                    </option>
                  ))
                }
              </select>
            </div>
          </div> 
        }
        <div className="nav__user w-full flex flex-row justify-center items-center gap-2">
          <img src={userImg} alt="user avatar" className="w-full h-6 rounded-full" />
          <span>{userDetails.login}</span>
        </div>
      </div>
      { burger && <div onClick={openMenu}><Menu /></div> } 
      { isOpen && <BoardCreation toggleWindow={toggleWindow} />}
    </header>
  );
};

export default Header;
