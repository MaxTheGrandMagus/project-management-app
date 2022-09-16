import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../store/store';
import { createTask } from '../store/task/taskSlice';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import { TaskCreationProps, TokenProps } from '../interfaces/interfaces';
import CloseIcon from '../assets/icons/close.icon';

const TaskCreation = ({ toggleWindow, colId, order }: TaskCreationProps) => {
  const dispatch = useAppDispatch();

  const [cookie] = useCookies(['user']);
  const decodedUser: TokenProps = jwt_decode(cookie.user);
  const userId = decodedUser.userId;
  const boardId = localStorage.getItem('boardId');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const titleInput = useRef<HTMLInputElement>(null);
  const { title, description } = formData;
  const taskData = {
    task: { title, description, userId },
    colId,
    boardId,
  };

  useEffect(() => {
    if (titleInput && titleInput.current) {
      titleInput.current.focus();
    }
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (boardId) {
      dispatch(createTask(taskData));
    }
    toggleWindow();
  };

  return (
    <section className="flex w-52 flex-col absolute rounded z-20 bg-sky-900 border border-sky-500 h-20 p-2 top-0 items-center">
      <form
        onSubmit={onSubmit}
        className="form w-full flex flex-col justify-start items-start gap-1 relative"
      >
        <label htmlFor="title">
          <input
            ref={titleInput}
            className="w-full bg-transparent focus:outline-none"
            value={title}
            id="title"
            name="title"
            onChange={onChange}
            placeholder="Type task title here..."
            type="text"
            required
          />
        </label>
        <label htmlFor="description">
          <input
            className="w-full bg-transparent focus:outline-none"
            value={description}
            name="description"
            id="description"
            onChange={onChange}
            placeholder="Some description..."
            type="text"
            required
          />
        </label>
        <input type="submit" className="hidden" />
      </form>
      <button
        onClick={toggleWindow}
        className="absolute top-1 right-1"
      >
        <CloseIcon />
      </button>
    </section>
  );
};

export default TaskCreation;
