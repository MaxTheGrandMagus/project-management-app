import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { chooseColId, chooseTaskId, deleteTask } from '../../store/tasks/tasks.slice';
import { TaskDelProps, UserProps } from '../../interfaces/interfaces';
import DotsIcon from '../../assets/icons/dotsIcon';
import TrashIcon from '../../assets/icons/trash.icon';
import { themes } from '../main/board-button';
import Avatar from 'react-avatar';
import { TaskProps as StoreTaskProps } from '../../store/boards/boards.slice';

const Task = ({ task, taskClick, columnId, users }: TaskProps) => {
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
      className="relative bg-white rounded-md m-2 pl-2 pr-8 py-2 hover:bg-gray-100 transition-all"
      onClick={openTask}
    >
      <h2 className='text-orange-500 font-bold'>{task.title}</h2>
      <div
        className="absolute z-20 top-1 right-2 flex items-center rounded-sm text-black cursor-pointer hover:bg-gray-300 transition-all"
        onClick={toggleDelTask}
      >
        {visibleAddTask && task.id !== undefined && (
          <div className="absolute z-10 top-full left-0 flex flex-col bg-sky-800 text-white">
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
      <p className='overflow-hidden text-ellipsis text-gray-500'>{task.description}</p>
      <Avatar 
        className='absolute top-4 right-1' 
        name={users && users.find((user) => user.id === task.userId)?.name}
        size="25"
        round={true}
        textSizeRatio={1.5}
      />
    </div>
  );
};

export default Task;

interface TaskProps {
  task: StoreTaskProps,
  columnId: string,
  taskClick?: () => void;
  users: UserProps[];
}