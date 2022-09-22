import React from 'react';
import { useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createColumn } from '../../store/columns/columns.slice';
import { useAppDispatch } from '../../store/store';
import { FormattedMessage, useIntl } from 'react-intl'
import { RiLayoutColumnFill } from 'react-icons/ri';

interface IFormValues {
  columnTitle: string;
}

const BoardAddColumnModal: React.FC<{ setIsOpenAddColumnModal: Function }> = ({ setIsOpenAddColumnModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const dispatch = useAppDispatch();

  const boardId = useParams().id;

  const onSubmit: SubmitHandler<IFormValues> = (data: { columnTitle: string; }) => { 
    if (boardId) {
      dispatch(
        createColumn({
          title: data.columnTitle,
          boardId: boardId,
        })
      );
      setIsOpenAddColumnModal(false);
    }
  };

  const intl = useIntl();
  const newColumn = intl.formatMessage({id: 'newColumn'});

  return (
    <>
      <div className='overflow-x-hidden overflow-y-auto fixed inset-0 z-50 flex justify-center items-center outline-none focus:outline-none'>
        <div className="w-auto max-w-3xl mx-auto my-6">
          <section className="w-full flex flex-col bg-white border-0 rounded-lg outline-none shadow-lg focus:outline-none">
            <p className="flex flex-row justify-center items-center gap-2 p-4 text-xl font-semibold leading-relaxed text-slate-500">
              <RiLayoutColumnFill size={25} />
              <FormattedMessage id='titleColumnCreation' />
            </p>
            <form className='flex flex-col justify-center items-center gap-6 p-4' onSubmit={handleSubmit(onSubmit)}>
              <div className='w-full flex flex-col gap-2'>
                <label className='text-sm text-gray-400' htmlFor="columnTitle"><FormattedMessage id='titleNewColumn' /></label>
                <input
                  className="inline-flex bg-transparent w-full items-center px-4 py-2 border border-solid border-slate-400 rounded-lg"
                  placeholder={newColumn}
                  type="text"
                  {...register('columnTitle', {
                    required: true,
                    minLength: 3,
                  })}
                />
                {errors.columnTitle && (
                  <span className="text-red-400">
                    <FormattedMessage id='errorColumn' />
                  </span>
                )}
              </div>
              <div className="w-full flex justify-between items-center p-4 rounded-b">
                <button
                  className="bg-transparent px-6 py-3 text-red-500 font-bold uppercase text-sm rounded outline-none focus:outline-none ease-linear transition-all"
                  type="button"
                  onClick={() => setIsOpenAddColumnModal(false)}
                >
                  <FormattedMessage id='close' />
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

export default BoardAddColumnModal;
