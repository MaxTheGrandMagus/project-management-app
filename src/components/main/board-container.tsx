import { useEffect, useState } from 'react';
import { AppState, useAppSelector } from '../../store/store';
import { IBoardColumnsTasks } from '../../store/boards/boards.slice';
import BoardItem from './board-item';
import ReactPortal from '../modal/portal';
import BoardDeleteModal from './board-delete-modal';
import BoardUpdateModal from './board-update-modal';
import Spinner from '../spinner';
import { toast } from 'react-toastify';

const BoardContainer: React.FC = () => {
  const { boards, currentBoard, isLoading, isError, message } = useAppSelector((state: AppState) => state.boards);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const toggleDeleteWindow = () => setIsDeleteModalOpen(!isDeleteModalOpen);
  const toggleUpdateWindow = () => setIsUpdateModalOpen(!isUpdateModalOpen);

  useEffect(() => {
    if (isError) toast.error(message);
  });

  if (isLoading) {
    return <div className='h-full my-auto flex justify-center items-center'>
      <Spinner />;
    </div>
  }

  return (
    <div className="w-full flex flex-row justify-start items-center flex-wrap gap-6 px-10 py-5">
      {!isError ? (
        boards.map((board: Pick<IBoardColumnsTasks, 'id' | 'title' | 'description'>) => (
          <BoardItem
            key={board.id}
            board={board}
            toggleDeleteWindow={toggleDeleteWindow}
            toggleUpdateWindow={toggleUpdateWindow}
          />
        ))
      ) : (
        <div className="text-red-300">
          Oops! Something went wrong!
        </div>
      )}
      {isDeleteModalOpen && (
        <ReactPortal showModal={isDeleteModalOpen}>
          <BoardDeleteModal
            boardId={currentBoard.id}
            toggleWindow={toggleDeleteWindow}
          />
        </ReactPortal>
      )}
      {isUpdateModalOpen && (
        <ReactPortal showModal={isDeleteModalOpen}>
          <BoardUpdateModal
            board={currentBoard}
            toggleWindow={toggleUpdateWindow}
          />
        </ReactPortal>
      )}
    </div>
  );
};

export default BoardContainer;
