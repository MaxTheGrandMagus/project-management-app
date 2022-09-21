import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppState, useAppDispatch, useAppSelector } from '../store/store';
import { deleteColumn } from '../store/columns/columns.slice';
import Task from './task/task';
import ReactPortal from './modal/portal';
import TaskCreation from './task-create';
import TrashIcon from '../assets/icons/trash.icon';
import DotsIcon from '../assets/icons/dotsIcon';
import { FormattedMessage } from 'react-intl';
import { UserProps } from '../interfaces/interfaces';
import { ITask } from '../store/boards/boards.slice';

const Column = ({ id, title, order, tasks, users, taskClick }: {
  id: string;
  title: string;
  order: number;
  tasks: Array<ITask>;
  users: Array<UserProps>;
  taskClick?: () => void;
}) => {
  const dispatch = useAppDispatch();

  const [visibleColumnOptions, setVisibleColumnOptions] = useState(false);
  const [isOpenCreateTaskModal, setIsOpenCreateTaskModal] = useState(false);

  const boardId = useParams().id;

  const toggleColumnOptions = () => {
    setVisibleColumnOptions(!visibleColumnOptions);
  };
  
  const toggeTaskCreateModal = () => {
    setIsOpenCreateTaskModal(!isOpenCreateTaskModal);
  };

  const handleColumnDelete = (id: string) => {
    if (boardId) {
      dispatch(deleteColumn({ 
        boardId: boardId, 
        id: id 
      }));
    }
  };

  return (
    <article
      key={id}
      className="relative overflow-visible overflow-y-auto w-56 h-full bg-slate-blue border rounded-md border-slate-blue shadow-lg"
    >
      <div className="flex justify-between align-baseline">
        <h4 className="text-lg text-white font-bold m-3">{title}</h4>
        <div
          className="relative flex items-center m-3 text-white cursor-pointer rounded-sm hover:bg-gray-300 transition-all"
          onClick={toggleColumnOptions}
        >
          {visibleColumnOptions && (
            <div className="absolute z-10 top-full left-0 flex flex-col bg-sky-800">
              <button
                className='flex p-1 z-10 whitespace-nowrap font-bold text-lg'
                onClick={() => handleColumnDelete(id)}
              >
                <TrashIcon />
              </button>
            </div>
          )}
          <DotsIcon />
        </div>
      </div>
      <div className="relative flex flex-col">
        {tasks && tasks.map((task) => (
          <Task
            key={task.id}
            columnId={id}
            task={task}
            users={users}
            taskClick={taskClick}
          />
        ))}
        <aside className="relative flex flex-col items-center m-2">
          <button
            onClick={toggeTaskCreateModal}
            className="relative w-full text-white text-lg font-bold rounded-sm hover:bg-white hover:text-black transition-all"
          >
            <FormattedMessage id="addTask" />
          </button>
          {isOpenCreateTaskModal && (
            <ReactPortal showModal={isOpenCreateTaskModal}>
              <TaskCreation
                columnId={id}
                order={order}
                toggleWindow={toggeTaskCreateModal}
              />
            </ReactPortal>
          )}
        </aside>
      </div>
    </article>
  );
};

export default Column;
