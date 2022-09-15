import { useEffect, useState } from 'react';
import { AppState, useAppSelector } from '../../store/store';
import Board from './board';
import ModalWindow from './modal-window';
import { toast } from 'react-toastify';
import { BoardProps } from '../interfaces';

const BoardContainer: React.FC = () => {
  const { boards, currentId, error, message } = useAppSelector((state: AppState) => state.boards);
  const [isOpen, setIsOpen] = useState(false);
  const toggleWindow = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (error) toast.error(message);
  });

  return (
    <div className="w-full flex flex-row justify-start items-center flex-wrap px-10 py-5">
      {!error ? (
        boards.map((board: BoardProps) => (
          <Board
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
        <ModalWindow
          boardId={currentId}
          toggleWindow={toggleWindow}
        />
      )}
    </div>
  );
};

export default BoardContainer;
