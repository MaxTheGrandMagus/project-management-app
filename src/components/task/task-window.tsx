
import { useEffect } from "react";
import { AppState, useAppDispatch, useAppSelector } from "../../store/store";
import { getUsers, updateTask } from "../../store/task/taskSlice";
import ArrowBack from "../../assets/icons/arrowBack";
import Textarea, { textareaThemes } from "./textarea";

const TaskWindow = ({taskClick, isOpenTask }: TaskWindowProps) => {
  const dispatch = useAppDispatch();
  const { currentTask, colId, users }  = useAppSelector((state: AppState) => state.tasks);
  
  const boardId = localStorage.getItem('boardId');

  const taskData = {
    body: {
      title: currentTask.title,
      order: currentTask.order,
      description: currentTask.description,
      userId: currentTask.userId,
      boardId: boardId,
      columnId: colId
    },
    id: currentTask.id
  };
  
  const handlerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if ((event.target.name === 'title' || event.target.name === 'description') ) {
      taskData.body[event.target.name] = event.target.value;
    }
  }
  
  const h = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handlerChange(event);
    dispatch(updateTask(taskData));
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
   
  return (
    <div className={`flex flex-col w-full  p-3 taskWindow absolute top-0 h-full bg-slate-500 z-50 ${isOpenTask? 'activeTaskWidow' : ''} sm:w-2/5`}  >
      <div className="flex items-center ">
        <Textarea onChange={h} className={textareaThemes.notFull} name="title" id='title' value={currentTask.title} />
      </div>
      <div className="flex items-center ">
        <h3 className="pr-3 ">Assignee</h3>
        <select className="selectUser outline-none border-none rounded bg-slate-500 hover:bg-slate-700 " name="user" id="user">
        <option value=''>Choose user</option>
          { users &&
            users.map((user) => 
              <option key={user.id} value={user.name}>{user.name}</option>
            )
          }
        </select>
      </div>
      <div className="flex items-start">
        <h3 className="pr-3 ">Date</h3>
        <input className="date bg-slate-500 text-white" type="date" name="date" id="date" />
      </div>
      <h3 className="pr-3 ">Description:</h3>
      <div className="flex grow items-start">
      <Textarea onChange={h} className={textareaThemes.full} name="description" id='description' value={currentTask.description} />
      </div>
      {/* <div className="flex items-center">
        <h3 className="pr-3">Done</h3>
        <input type="checkbox" name="done" id="done" />
      </div> */}
      <button className="p-3 self-end" onClick={taskClick}>
        <ArrowBack />
      </button>
    </div>
  );
};

export default TaskWindow;

interface TaskWindowProps {
   taskClick: () => void;
  isOpenTask: boolean;
}

