import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { BoardColumnTaskProps, updateBoard } from '../../store/boards/boards.slice';
import { FormattedMessage } from 'react-intl'
import { HiPencilAlt } from 'react-icons/hi'

const BoardUpdateModal = ({ board, toggleWindow }: { 
  board: Pick<BoardColumnTaskProps, 'id' | 'title' | 'description'>;
  toggleWindow: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: board.title,
    description: board.description,
  });
  const { title, description } = formData;

  const dispatch = useAppDispatch();  
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateBoard({
      id: board.id,
      title: title,
      description: description,
    }));
    toggleWindow();
  };

  // const placeholderTitle = intl.formatMessage({id: 'placeholderTitleBoard'});
  // const placeholderDecsription = intl.formatMessage({id: 'placeholderDecsriptionBoard'});

  return (
    <>
      <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 flex justify-center items-center outline-none focus:outline-none">
        <div className="w-auto max-w-3xl mx-auto my-6">
          <section className="w-full flex flex-col bg-white border-0 rounded-lg outline-none shadow-lg focus:outline-none">
            <p className="flex flex-row justify-center items-center gap-2 p-4 text-xl font-semibold leading-relaxed text-slate-500">
              <HiPencilAlt />
              <FormattedMessage id='titleBoardUpdate' />
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center gap-6 p-4"
            >
              <div className='w-full flex flex-col gap-2'>
                <label className="text-sm text-gray-400" htmlFor="title"><FormattedMessage id='titleNewBoard' /></label>
                <input
                  value={title}
                  name="title"
                  onChange={handleChange}
                  className="inline-flex bg-transparent w-full items-center px-4 py-2 border border-solid border-slate-400 rounded-lg"
                  type="text"
                  required
                />
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label className="text-sm text-gray-400" htmlFor="description"><FormattedMessage id='decsriptionNewBoard' /></label>
                <input
                  value={description}
                  name="description"
                  onChange={handleChange}
                  className="inline-flex bg-transparent w-full items-center px-4 py-2 border border-solid border-slate-400 rounded-lg"
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
                  <FormattedMessage id='update' />
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

export default BoardUpdateModal;
