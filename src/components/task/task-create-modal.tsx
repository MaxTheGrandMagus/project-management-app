import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { createTask } from '../../store/tasks/tasks.slice';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import { TokenProps } from '../../interfaces/interfaces';
import { CgAddR } from 'react-icons/cg';
import { FormattedMessage, useIntl } from 'react-intl';

const TaskCreateModal = ({ columnId, order, toggleWindow }: {
  columnId: string,
  order: number,
  toggleWindow: () => void
}) => {
  const dispatch = useAppDispatch();

  const [cookie] = useCookies(['user']);
  const decodedUser: TokenProps = jwt_decode(cookie.user);
  const userId = decodedUser.userId;
  const boardId = useParams().id as string;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const titleInput = useRef<HTMLInputElement>(null);
  const { title, description } = formData;
  const taskData = {
    boardId: boardId,
    columnId: columnId,
    task: { 
      title, 
      description, 
      userId 
    },
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
  
  const intl = useIntl();
  const newTaskTitle = intl.formatMessage({id: 'newTaskTitle'});
  const newTaskDescription = intl.formatMessage({id: 'newTaskDescription'});

  return (
    <>
      <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 flex justify-center items-center outline-none focus:outline-none">
        <div className="w-auto max-w-3xl mx-auto my-6">
          <section className="w-full flex flex-col bg-white border-0 rounded-lg outline-none shadow-lg focus:outline-none">
            <p className="flex flex-row justify-center items-center gap-2 p-4 text-xl font-semibold leading-relaxed text-slate-500">
              <CgAddR />
              <FormattedMessage id='titleTaskCreation' />
            </p>
            <form
              onSubmit={onSubmit}
              className="flex flex-col justify-center items-center gap-6 p-4"
            >
              <div className='w-full flex flex-col gap-2'>
                <label className='text-sm text-gray-400' htmlFor="title"><FormattedMessage id='titleNewTask' /></label>
                <input
                  ref={titleInput}
                  className="inline-flex bg-transparent w-full items-center px-4 py-2 border border-solid border-slate-400 rounded-lg"
                  value={title}
                  id="title"
                  name="title"
                  onChange={onChange}
                  placeholder={newTaskTitle}
                  type="text"
                  required
                />
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label className='text-sm text-gray-400' htmlFor="description"><FormattedMessage id='DescriptionNewTask' /></label>
                <input
                  className="inline-flex bg-transparent w-full items-center px-4 py-2 border border-solid border-slate-400 rounded-lg"
                  value={description}
                  name="description"
                  id="description"
                  onChange={onChange}
                  placeholder={newTaskDescription}
                  type="text"
                  required
                />
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
                  <FormattedMessage id='create' />
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default TaskCreateModal;
