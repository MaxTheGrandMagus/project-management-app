import { useState } from 'react';
import { AppState, useAppDispatch, useAppSelector } from '../store/store';
import { ColumnTaskProps } from '../store/task/taskSlice';
import { deleteColumn } from '../store/columns/colSlice';
import Task from './task/task';
import DotsIcon from '../assets/icons/dotsIcon';
import TaskCreation from './creation-task';
import TrashIcon from '../assets/icons/trash.icon';
import { themes } from './main-route/board-button';
import { FormattedMessage } from 'react-intl';

export interface ColumnProps {
  colId: string;
  boardId: string;
}

const Column = ({ id, title, order, tasks, taskClick }: ColumnTaskProps) => {
  const dispatch = useAppDispatch();

  const [isOpenTaskWin, setIsOpenTaskWin] = useState(false);
  const [visibleAddTask, setVisibleAddTask] = useState(false);
  const boardId = localStorage.getItem('boardId');

  const toggeTaskWindow = () => {
    setIsOpenTaskWin(!isOpenTaskWin);
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
          className="relative flex items-center m-3 text-white cursor-pointer rounded-sm hover:bg-gray-400 transition-all"
          onClick={toggleAddTask}
        >
          {visibleAddTask && (
            <div className="flex flex-col absolute top-full right-0 bg-sky-800">
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
          />
        ))}
        <aside className="relative flex flex-col items-center m-2">
          <button
            onClick={toggeTaskWindow}
            className="relative w-full text-white text-lg font-bold rounded-sm hover:bg-white hover:text-black transition-all"
          >
            <FormattedMessage id="addTask" />
          </button>
          {isOpenTaskWin && (
            <TaskCreation
              order={order}
              colId={id}
              toggleWindow={toggeTaskWindow}
            />
          )}
        </aside>
      </div>
    </article>
  );
};

export default Column;
