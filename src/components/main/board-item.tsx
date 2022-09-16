import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { openboard, chooseBoardId } from '../../store/boards/boardsSlice';
import { BoardProps } from '../../interfaces/interfaces';
import BoardButton, { themes } from './board-button';
import { FormattedMessage } from 'react-intl';
import { HiOutlineTrash } from 'react-icons/hi'

const BoardItem: React.FC<BoardProps> = ({ id, title, description, toggleWindow }) => {
  const dispatch = useAppDispatch();

  const onOpen = () => {
    dispatch(chooseBoardId(id));
    if (toggleWindow) {
      toggleWindow();
    }
  };
  
  const openAndSave = () => {
    if (id) {
      localStorage.setItem('boardId', id);
    }
    dispatch(openboard(id));
  };

  return (
    <div className="relative w-80 h-40 flex flex-col items-center bg-alice-blue border rounded shadow-md text-black cursor-pointer hover:shadow-xl transition-all duration-200">
      <NavLink
        to={`/board/${id}`}
        onClick={openAndSave}
        className="w-full h-full flex flex-col p-4"
      >
        <div className="text-xl font-bold">{title}</div>
        <div>{description}</div>
      </NavLink>
      <button
        className="absolute top-4 right-3 hover:text-slate-blue transition-all duration-200"
        onClick={onOpen}
      >
        <HiOutlineTrash size={25} />
      </button>
    </div>
  );
};

export default BoardItem;
