
import { useAppDispatch } from "../../store/store";
import { deleteBoard } from "../../store/boards/boards.slice";
import { FormattedMessage } from "react-intl";

const BoardDeleteModal: React.FC<{
  boardId: string; 
  toggleWindow: () => void; 
}> = ({ boardId, toggleWindow }) => {
  const dispatch = useAppDispatch();

  const onDeleteBoard = () => {
    dispatch(deleteBoard(boardId));
    toggleWindow();
  }

  const onCancelHandler = () => {
    toggleWindow();
  }
  
  return (
    <section className="modal w-full flex flex-col bg-white border-0 rounded-lg outline-none shadow-lg focus:outline-none">
      <p className="my-4 p-4 text-lg leading-relaxed text-slate-500">
        <FormattedMessage id='deleteBoard' />
      </p>
      <div className="flex justify-between items-center p-4 border-t border-solid border-slate-200 rounded-b">
        <button
          className="bg-transparent px-6 py-3 text-red-500 font-bold uppercase text-sm rounded outline-none focus:outline-none ease-linear transition-all"
          type="button"
          onClick={onCancelHandler}
        >
          <FormattedMessage id='no' />
        </button>
        <button
          className="bg-emerald-500 px-6 py-3 text-white font-bold uppercase text-sm rounded outline-none active:bg-emerald-600 focus:outline-none ease-linear transition-all"
          type="button"
          onClick={onDeleteBoard}
        >
          <FormattedMessage id='yes' />
        </button>
      </div>
    </section>
  )
}

export default BoardDeleteModal;

