
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AppState, useAppDispatch, useAppSelector } from "../../store/store";
import { updateTask } from "../../store/tasks/tasks.slice";
import { FormattedMessage } from "react-intl";
import { TbEdit } from "react-icons/tb";
import { UserProps } from "../../interfaces/interfaces";

const TaskUpdateModal = ({ users, toggleWindow }: {
  users: Array<UserProps>;
  toggleWindow: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { currentTask, columnId }  = useAppSelector((state: AppState) => state.tasks);
  
  const boardId = useParams().id as string;
  const [taskData, setTaskData] = useState({
    boardId: boardId,
    columnId: columnId,
    id: currentTask.id,
    task: {
      title: currentTask.title,
      order: currentTask.order,
      description: currentTask.description,
      userId: currentTask.userId,
      boardId: boardId,
      columnId: columnId,
    }
  })
  
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    setTaskData((prevState) => ({
      ...prevState,
      task: {
        ...prevState.task,
        [event.target.name]: event.target.value,
      }
    }));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateTask(taskData));
    toggleWindow();
  };
   
  return (
    <section 
      className={`
        modal w-full flex flex-col bg-white border-0 rounded-lg outline-none shadow-lg focus:outline-none
      `}
    >
      <p className="flex flex-row justify-center items-center gap-2 px-4 py-2 text-xl font-semibold leading-relaxed text-slate-500">
        <TbEdit />
        <FormattedMessage id='editTask' />
      </p>
      <form 
        className="flex flex-col justify-center items-center gap-6 p-4"
        onSubmit={handleSubmit}  
      >
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm text-gray-400" htmlFor="title"><FormattedMessage id='titleNewTask' /></label>
          <input 
            className="inline-flex bg-transparent w-full items-center px-4 py-2 border border-solid border-slate-400 rounded-lg"
            type="text" 
            onChange={handleChange} 
            name="title" 
            id='title' 
            value={taskData.task.title}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm text-gray-400" htmlFor="user"><FormattedMessage id='taskAssignee' /></label>
          <select 
            className="inline-flex bg-transparent w-full items-center px-4 py-2 border border-solid border-slate-400 rounded-lg" 
            name="userId" 
            id="user"
            onChange={handleChange}
          >
            <option 
              className="bg-transparent" 
              value={taskData.task.userId}
            >
              { users && users.find((user) => user.id === taskData.task.userId)?.name }
            </option>
            {users && users.map((user) => 
              <option 
                key={user.id} 
                value={user.id}
              >
                {user.name}
              </option>
            )}
          </select>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm text-gray-400" htmlFor="description"><FormattedMessage id='taskDescription' /></label>
          <textarea 
            className="inline-flex bg-transparent resize-none w-full items-center px-4 py-2 border border-solid border-slate-400 rounded-lg" 
            name="description" 
            id="description"
            value={taskData.task.description} 
            onChange={handleChange} 
          >
          </textarea>
        </div>
        <div className="w-full flex justify-between items-center p-4 rounded-b">
          <button
            className="bg-transparent px-6 py-3 text-red-500 font-bold uppercase text-sm rounded outline-none focus:outline-none ease-linear transition-all"
            type="button"
            onClick={toggleWindow}
          >
            <FormattedMessage id='cancel' />
          </button>
          <button
              className="bg-emerald-500 px-6 py-3 text-white font-bold uppercase text-sm rounded outline-none active:bg-emerald-600 focus:outline-none ease-linear transition-all"
              type="submit"
            >
              <FormattedMessage id='saveTask' />
            </button>
        </div>
      </form>
    </section>
  );
};

export default TaskUpdateModal;
