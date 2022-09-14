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

const Column = ({ title, id, order, tasks, taskClick }: ColumnTaskProps) => {
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
      className="overflow-y-auto h-full bg-slate-800 border border-slate-800 hover:border hover:border-slate-600 rounded-md relative overflow-visible w-56"
    >
      <div className="flex justify-between align-baseline">
        <h4 className="m-3">{title}</h4>
        <div
          className=" relative flex m-3 items-center cursor-pointer hover:bg-slate-500 "
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
      <div className="flex flex-col relative ">
        {tasks && tasks.map((task) => (
          <Task
            taskClick={taskClick}
            key={task.id}
            task={task}
            columnId={id}
          />
        ))}
        <aside className="relative flex flex-col items-center">
          <button
            onClick={toggeTaskWindow}
            className="text-gray-400 relative"
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
