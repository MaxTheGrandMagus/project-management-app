import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { reset } from '../../store/auth/auth.slice';
import { resetUser } from '../../store/users/users.slice';
import ReactPortal from '../modal/portal';
import BoardCreateModal from '../main/board-create-modal';
import jwt_decode from 'jwt-decode'
import { useCookies } from 'react-cookie';
import { TokenProps } from '../../interfaces/interfaces';
import { FaUserCircle } from 'react-icons/fa'
import Logo from '../logo';
import Menu from '../../assets/icons/menu';
import { LOCALES } from '../../i18n/locales';
import { FormattedMessage } from 'react-intl';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';

export type HeaderProps = {
  currentLocale: string,
  handleChange: ({target: { value }}: {target: { value: string }}) => void,
};

const Header = ({ currentLocale, handleChange }: HeaderProps) => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [burger, setBurger] = useState(false);
  const [width, setWidth] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false)

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  const decodedUser: TokenProps = jwt_decode(cookie.user);
  console.log(decodedUser);

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
    const handleStickyHeader = () => {
      window.scrollY >= 40 ? setSticky(true) : setSticky(false);
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
  }, [dispatch]);

  const languages = [
    { name: 'EN', code: LOCALES.ENGLISH },
    { name: 'RU', code: LOCALES.RUSSIAN },
  ]

  const openMenu = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <header className={`
      ${sticky ? 'header--sticky' : 'h-full'} 
      relative bg-lavender-blue w-full flex justify-between items-center px-5 py-4 shadow-md text-black
    `}>
      <div ref={inputEl} className={`${sticky ? 'text-white' : 'text-black'} logo`}>
        <Link to="/main">
          <Logo />
        </Link>
      </div>

      <div className='flex justify-between'>
        <div className={`
          ${(sticky ? 'bg-slate-blue sm:bg-slate-blue' : 'bg-lavender-blue sm:bg-lavender-blue')})} 
          ${(burger && isNavOpen)? "hidden" : 'visible'}
          nav__list z-20 absolute top-12 right-10 flex flex-col justify-between items-center gap-6 sm:flex-row sm:static
        `}>
          <button 
            className={`
              flex justify-center items-center gap-2 p-1 z-10 whitespace-nowrap font-bold text-lg border-2 rounded transition-all
              ${(sticky 
                ? 'text-white border-slate-blue hover:bg-lavender-blue hover:border-lavender-blue hover:text-black' 
                : 'text-black border-lavender-blue hover:bg-slate-blue hover:border-slate-blue hover:text-white'
              )}
            `}
            onClick={toggleWindow}
          >
            <MdOutlineDashboardCustomize size={20} />
            <FormattedMessage id="boardCreationBtn" />
          </button>
          {decodedUser && (
            <Link to="/profile/edit" 
              className={`
                flex flex-row justify-center items-center gap-2 p-1 border-2 rounded transition-all
                ${(sticky 
                  ? 'text-white border-slate-blue hover:bg-lavender-blue hover:border-lavender-blue hover:text-black' 
                  : 'text-black border-lavender-blue hover:bg-slate-blue hover:border-slate-blue hover:text-white'
                )}
              `}
            >
              <FaUserCircle size={25} />
              <span className='text-lg font-bold'>{decodedUser.login}</span>
            </Link>
          )}
          <button 
            className={`
              flex justify-center items-center gap-2 p-1 z-10 whitespace-nowrap font-bold text-lg border-2 rounded transition-all
              ${(sticky 
                ? 'text-white border-slate-blue hover:bg-lavender-blue hover:border-lavender-blue hover:text-black' 
                : 'text-black border-lavender-blue hover:bg-slate-blue hover:border-slate-blue hover:text-white'
              )}
            `}
            onClick={onLogout}
          >
            <FormattedMessage id="signOut" />
            <FiLogOut size={20} />
          </button>
          <div className="switch">
            <select className='text-slate-blue text-lg font-bold rounded mr-4 p-1' onChange={handleChange}  value={currentLocale}>
              {
                languages.map(({ name, code }) => (
                  <option className='bg-white text-black transition-all' key={code}  value={code}>
                    {name}
                  </option>
                ))
              }
            </select>
          </div>
        </div>
      </div>

      {burger && <div onClick={openMenu}><Menu /></div>} 
      
      {isOpen && (
        <ReactPortal showModal={isOpen}>
          <BoardCreateModal toggleWindow={toggleWindow} />
        </ReactPortal>
      )}
    </header>
  );
};

export default Header;
