import { useEffect, useState } from 'react';
import { AppState, useAppSelector } from '../../store/store';
import BoardItem from './board-item';
import ReactPortal from '../modal/portal';
import BoardModal from './board-modal';
import Spinner from '../spinner';
import { toast } from 'react-toastify';
import { BoardProps } from '../../interfaces/interfaces';

const BoardContainer: React.FC = () => {
  const { boards, currentId, error, message, loading: isLoading } = useAppSelector((state: AppState) => state.boards);
  const [isOpen, setIsOpen] = useState(false);
  const toggleWindow = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (error) toast.error(message);
  });

  if (isLoading) {
    return <div className='h-full my-auto flex justify-center items-center'>
      <Spinner />;
    </div>
  }

  return (
    <div className="w-full flex flex-row justify-start items-center flex-wrap gap-6 px-10 py-5">
      {!error ? (
        boards.map((board: BoardProps) => (
          <BoardItem
            toggleWindow={toggleWindow}
            id={board.id}
            key={board.id}
            title={board.title}
            description={board.description}
          />
        ))
      ) : (
        <div className="text-red-300">
          Oops! Something does wrong!
        </div>
      )}
      {isOpen && (
        <ReactPortal showModal={isOpen}>
          <BoardModal
            boardId={currentId}
            toggleWindow={toggleWindow}
          />
        </ReactPortal>
      )}
    </div>
  );
};

export default BoardContainer;
