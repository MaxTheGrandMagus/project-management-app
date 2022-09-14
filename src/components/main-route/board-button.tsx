import { FormattedMessage } from 'react-intl';
import { ButtonProps } from '../interfaces';

export const themes = {
  light:
    'whitespace-nowrap flex p-1 bg-sky-500 z-10 m-2 hover:bg-gradient-to-r from-sky-500 to-orange-400 text-transparent bg-clip-text',
  grey: 'whitespace-nowrap flex p-1 bg-sky-800 z-10 m-1 hover:bg-sky-500',
  absolute:
    'absolute top-full right-0 whitespace-nowrap z-10 flex p-1 bg-sky-800 m-2 hover:bg-sky-500',
  dark: 'form__button flex px-4 py-2 text-lg z-10 border-transparent rounded-md shadow-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200',
};

const BoardButton = (props: ButtonProps) => {
  return (
    <button
      type={props.type}
      className={props.themes}
      onClick={props.onClick}
    >
      <FormattedMessage id={props.text} />
      {/* {props.text} */}
    </button>
  );
};

export default BoardButton;
