import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { chooseColId, chooseTaskId, deleteTask } from '../../store/task/taskSlice';
import { TaskDelProps, TaskProps } from '../interfaces';
import DotsIcon from '../../assets/icons/dotsIcon';
import TrashIcon from '../../assets/icons/trash.icon';
import { themes } from '../main-route/board-button';

const Task = ({ task, taskClick, columnId }: TaskProps) => {
  const dispatch = useAppDispatch();
  const [visibleAddTask, setVisibleAddTask] = useState(false);

  const toggleDelTask = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    setVisibleAddTask(!visibleAddTask);
  };

  const boardId = localStorage.getItem('boardId');

  let treeId: TaskDelProps;

  if (boardId) {
    treeId = {
      boardId: boardId,
      colId: columnId,
      taskId: task.id,
    };
  }

  const handleTaskDelete = () => {
    dispatch(deleteTask(treeId));
  };

  const openTask = () => {
    if (taskClick) {
      taskClick();
      dispatch(chooseTaskId(task));
      dispatch(chooseColId(columnId));
    }
  };

  return (
    <div
      className="bg-slate-700 border border-slate-600 rounded-md m-2 p-2 hover:border hover:border-slate-500"
      onClick={openTask}
    >
      <div className="flex justify-between text-orange-300">
        <h2>{task.title}</h2>
        <div
          className=" relative flex items-center cursor-pointer hover:bg-slate-500 "
          onClick={toggleDelTask}
        >
          {visibleAddTask && task.id !== undefined && (
            <div className="flex flex-col absolute top-full right-0 bg-sky-800">
              <button
                className={themes.grey}
                onClick={handleTaskDelete}
              >
                <TrashIcon />
              </button>
            </div>
          )}
          <DotsIcon />
        </div>
      </div>
      <div>{task.description}</div>
    </div>
  );
};

export default Task;
