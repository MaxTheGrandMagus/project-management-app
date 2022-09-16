import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { chooseColId, chooseTaskId, deleteTask } from '../../store/task/taskSlice';
import { TaskDelProps, TaskProps } from '../../interfaces/interfaces';
import DotsIcon from '../../assets/icons/dotsIcon';
import TrashIcon from '../../assets/icons/trash.icon';
import { themes } from '../main/board-button';

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
      className="bg-white rounded-md m-2 p-2 hover:bg-gray-100 transition-all"
      onClick={openTask}
    >
      <div className="flex justify-between">
        <h2 className='text-orange-500 font-bold'>{task.title}</h2>
        <div
          className="text-black relative flex items-center cursor-pointer rounded-sm hover:bg-gray-300 transition-all"
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
      <p className='text-gray-500'>{task.description}</p>
    </div>
  );
};

export default Task;
