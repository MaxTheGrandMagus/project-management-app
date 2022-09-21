import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { openBoard, chooseBoard, IBoardColumnsTasks } from '../../store/boards/boards.slice';
import { HiOutlineTrash } from 'react-icons/hi';
import { HiPencilAlt } from 'react-icons/hi';

const BoardItem: React.FC<{ 
  board: Pick<IBoardColumnsTasks, 'id' | 'title' | 'description'>; 
  toggleDeleteWindow: () => void; 
  toggleUpdateWindow: () => void; 
}> = ({ board, toggleDeleteWindow, toggleUpdateWindow }) => {
  const dispatch = useAppDispatch();

  const onOpenUpdateModal = () => {
    dispatch(chooseBoard(board));
    if (toggleUpdateWindow) {
      toggleUpdateWindow();
    }
  };

  const onOpenDeleteModal = () => {
    dispatch(chooseBoard(board));
    if (toggleDeleteWindow) {
      toggleDeleteWindow();
    }
  };
  
  const openAndSave = () => {
    dispatch(openBoard(board));
  };

  return (
    <div className="relative w-80 h-40 flex flex-col items-center bg-alice-blue border rounded shadow-md text-black cursor-pointer hover:shadow-xl transition-all duration-200">
      <NavLink
        to={`/board/${board.id}`}
        onClick={openAndSave}
        className="w-full h-full flex flex-col pl-4 pr-16 py-4"
      >
        <div className="text-xl font-bold">{board.title}</div>
        <div>{board.description}</div>
      </NavLink>
      <button
        className="absolute top-4 right-10 hover:text-slate-blue transition-all duration-200"
        onClick={onOpenUpdateModal}
      >
        <HiPencilAlt size={25} />
      </button>
      <button
        className="absolute top-4 right-3 hover:text-slate-blue transition-all duration-200"
        onClick={onOpenDeleteModal}
      >
        <HiOutlineTrash size={25} />
      </button>
    </div>
  );
};

export default BoardItem;
