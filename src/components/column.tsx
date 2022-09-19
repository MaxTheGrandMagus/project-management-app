import { useState } from 'react';
import { AppState, useAppDispatch, useAppSelector } from '../store/store';
import { deleteColumn } from '../store/columns/columns.slice';
import Task from './task/task';
import ReactPortal from './modal/portal';
import TaskCreation from './task-create';
import TrashIcon from '../assets/icons/trash.icon';
import DotsIcon from '../assets/icons/dotsIcon';
import { themes } from './main/board-button';
import { FormattedMessage } from 'react-intl';
import { UserProps } from '../interfaces/interfaces';
import { TaskProps } from '../store/boards/boards.slice';

export interface ColumnProps {
  colId: string;
  boardId: string;
}

const Column = ({ id, title, order, tasks, taskClick, users }: ColumnTaskProps) => {
  const dispatch = useAppDispatch();

  const [isOpenCreateTaskModal, setIsOpenCreateTaskModal] = useState(false);
  const [visibleAddTask, setVisibleAddTask] = useState(false);
  const boardId = localStorage.getItem('boardId');

  const toggeTaskWindow = () => {
    setIsOpenCreateTaskModal(!isOpenCreateTaskModal);
  };

  const toggleAddTask = () => {
    setVisibleAddTask(!visibleAddTask);
  };

  const handleColumnDelete = (id: string) => {
    if (boardId) {
      dispatch(deleteColumn({ boardId: boardId, id: id }));
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
          onClick={toggleAddTask}
        >
          {visibleAddTask && (
            <div className="absolute z-10 top-full left-0 flex flex-col bg-sky-800">
              <button
                className={themes.grey}
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
            taskClick={taskClick}
            key={task.id}
            task={task}
            columnId={id}
            users={users}
          />
        ))}
        <aside className="relative flex flex-col items-center m-2">
          <button
            onClick={toggeTaskWindow}
            className="relative w-full text-white text-lg font-bold rounded-sm hover:bg-white hover:text-black transition-all"
          >
            <FormattedMessage id="addTask" />
          </button>
          {isOpenCreateTaskModal && (
            <ReactPortal showModal={isOpenCreateTaskModal}>
              <TaskCreation
                colId={id}
                order={order}
                toggleWindow={toggeTaskWindow}
              />
            </ReactPortal>
          )}
        </aside>
      </div>
    </article>
  );
};

export default Column;

interface ColumnTaskProps {
  id: string;
  title: string;
  order: number;
  tasks: Array<TaskProps>;
  taskClick?: () => void;
  users: Array<UserProps>;
}