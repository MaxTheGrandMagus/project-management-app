import { FormattedMessage } from 'react-intl';
import { ButtonProps } from '../interfaces';

export const themes = {
  light:
    'flex p-1 z-10 whitespace-nowrap font-bold text-lg',
  grey: 'flex p-1 z-10 whitespace-nowrap font-bold text-lg',
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
