import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { createBoard } from '../../store/boards/boards.slice';
import { FormattedMessage, useIntl } from 'react-intl'
import { MdOutlineDashboardCustomize } from 'react-icons/md'

const BoardCreateModal = ({ toggleWindow }: { toggleWindow: () => void }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const dispatch = useAppDispatch();

  const placeholderTitle = useIntl().formatMessage({ id: 'placeholderTitleBoard' });
  const placeholderDecsription = useIntl().formatMessage({ id: 'placeholderDecsriptionBoard' });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createBoard(formData));
    toggleWindow();
  };

  return (
    <section className="modal w-full flex flex-col bg-white border-0 rounded-lg outline-none shadow-lg focus:outline-none">
      <p className="flex flex-row justify-center items-center gap-2 p-4 text-xl font-semibold leading-relaxed text-slate-500">
        <MdOutlineDashboardCustomize />
        <FormattedMessage id='titleBoardCreation' />
      </p>
      <form
        className="flex flex-col justify-center items-center gap-6 p-4"
        onSubmit={onSubmit}
      >
        <div className='w-full flex flex-col gap-2'>
          <label className="text-sm text-gray-400" htmlFor="title"><FormattedMessage id='titleNewBoard' /></label>
          <input
            value={formData.title}
            name="title"
            onChange={onChange}
            className="inline-flex bg-transparent w-full items-center px-4 py-2 border border-solid border-slate-400 rounded-lg"
            type="text"
            placeholder={placeholderTitle}
            required
          />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label className="text-sm text-gray-400" htmlFor="description"><FormattedMessage id='decsriptionNewBoard' /></label>
          <input
            value={formData.description}
            name="description"
            onChange={onChange}
            className="inline-flex bg-transparent w-full items-center px-4 py-2 border border-solid border-slate-400 rounded-lg"
            type="text"
            placeholder={placeholderDecsription}
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
  );
};

export default BoardCreateModal;
