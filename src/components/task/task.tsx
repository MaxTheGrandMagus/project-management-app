import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { chooseColumnId, chooseTask, deleteTask, ITaskToDelete } from '../../store/tasks/tasks.slice';
import { UserProps } from '../../interfaces/interfaces';
import DotsIcon from '../../assets/icons/dotsIcon';
import TrashIcon from '../../assets/icons/trash.icon';
import Avatar from 'react-avatar';
import { ITask } from '../../store/boards/boards.slice';

const Task = ({ columnId, task, users, taskClick }: {
  columnId: string,
  task: ITask,
  users: UserProps[];
  taskClick?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const [visibleTaskOptions, setVisibleTaskOptions] = useState(false);

  const toggleTaskOptions = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    setVisibleTaskOptions(!visibleTaskOptions);
  };

  const boardId = useParams().id as string;

  let treeId: ITaskToDelete = {
    boardId: boardId,
    columnId: columnId,
    id: task.id,
  };

  const handleTaskDelete = () => {
    dispatch(deleteTask(treeId));
  };

  const openTask = () => {
    if (taskClick) {
      taskClick();
      dispatch(chooseColumnId(columnId));
      dispatch(chooseTask(task));
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
        onClick={toggleTaskOptions}
      >
        {visibleTaskOptions && task.id && (
          <div className="absolute z-10 top-full left-0 flex flex-col bg-sky-800 text-white">
            <button
              className='flex p-1 z-10 whitespace-nowrap font-bold text-lg'
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
