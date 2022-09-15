import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { openboard, chooseBoardId } from '../../store/boards/boardsSlice';
import { BoardProps } from '../interfaces';
import BoardButton, { themes } from './board-button';

const Board: React.FC<BoardProps> = ({ id, title, description, toggleWindow }) => {
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
    <div className="flex flex-row items-center border rounded m-2 p-2 shadow-md text-black cursor-pointer hover:shadow-xl transition-all duration-200">
      <NavLink
        to={`/board/${id}`}
        onClick={openAndSave}
        className="flex flex-col m-2"
      >
        <div className="text-xl font-bold">{title}</div>
        <div>{description}</div>
      </NavLink>
      <BoardButton
        themes={themes.light}
        text="delete"
        onClick={onOpen}
      />
    </div>
  );
};

export default Board;
