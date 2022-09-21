
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AppState, useAppDispatch, useAppSelector } from "../../store/store";
import { updateTask } from "../../store/tasks/tasks.slice";
import Textarea, { textareaThemes } from "./textarea";
import { FormattedMessage } from "react-intl";
import { TbEdit } from "react-icons/tb";
import { UserProps } from "../../interfaces/interfaces";

const TaskWindow = ({ taskClick, isOpenTask, users }: {
  taskClick: () => void;
  isOpenTask: boolean;
  users: Array<UserProps>;
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
    if (event.target.name === 'title') {
      setTaskData((prev) => ({
        ...prev,
        task: {
          ...prev.task,
          title: event.target.value,
        }
      }));
    }
    if (event.target.name === 'description') {
      setTaskData((prev) => ({
        ...prev,
        task: {
          ...prev.task,
          description: event.target.value
        }
      }));
    }
    if (event.target.name === 'user') {
      console.log(event.target.value);
      setTaskData((prev) => ({
        ...prev,
        task: {
          ...prev.task,
          userId: event.target.value
        }
      }));
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateTask(taskData));
    taskClick();
  };
   
  return (
    <>
      <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 flex justify-center items-center outline-none focus:outline-none">
        <div className="w-auto max-w-3xl mx-auto my-6">
          <form 
            className={`
              w-full flex flex-col bg-white border-0 rounded-lg outline-none shadow-lg focus:outline-none
            `}
            onSubmit={handleSubmit}
          >
            <p className="flex flex-row justify-center items-center gap-2 px-4 py-2 text-xl font-semibold leading-relaxed text-slate-500">
              <TbEdit />
              <FormattedMessage id='editTask' />
            </p>
            <div className="w-full flex flex-col gap-2 px-4 py-2">
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
            <div className="w-full flex flex-col gap-2 px-4 py-2">
              <label className="text-sm text-gray-400" htmlFor="user"><FormattedMessage id='taskAssignee' /></label>
              <select 
                className="inline-flex bg-transparent w-full items-center px-4 py-2 border border-solid border-slate-400 rounded-lg" 
                name="user" 
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
                  <option key={user.id} value={user.id} defaultValue={taskData.task.userId}>{user.name}</option>
                )}
              </select>
            </div>
            {/* <div className="w-full flex flex-col gap-2 px-4 py-2">
              <label className="text-sm text-gray-400" htmlFor="date"><FormattedMessage id='taskDate' /></label>
              <input 
                className="inline-flex bg-transparent w-full items-center px-4 py-2 border border-solid border-slate-400 rounded-lg" 
                type="date" 
                name="date" 
                id="date" 
              />
            </div> */}
            <div className="w-full flex flex-col gap-2 px-4 py-2">
              <label className="text-sm text-gray-400" htmlFor="description"><FormattedMessage id='taskDescription' /></label>
              <Textarea onChange={handleChange} className={textareaThemes.full} name="description" id='description' value={taskData.task.description} />
            </div>
            <div className="w-full flex justify-between items-center p-4 rounded-b">
              <button
                className="bg-transparent px-6 py-3 text-red-500 font-bold uppercase text-sm rounded outline-none focus:outline-none ease-linear transition-all"
                type="button"
                onClick={taskClick}
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
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default TaskWindow;
