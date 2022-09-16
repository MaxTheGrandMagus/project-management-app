
import { useAppDispatch } from "../../store/store";
import { deleteBoard } from "../../store/boards/boardsSlice";
import BoardButton, { themes } from "./board-button";
import { ModalProps } from "../../interfaces/interfaces";
import { FormattedMessage } from "react-intl";

const BoardModal = (props: ModalProps) => {
  const dispatch = useAppDispatch();

  const onDeleteBoard = () => {
    dispatch(deleteBoard(props.boardId))
    props.toggleWindow()
  }

  const onCancelHandler = () => {
    props.toggleWindow()
  }
  
  return (
    <>
      <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 flex justify-center items-center outline-none focus:outline-none">
        <div className="w-auto max-w-3xl mx-auto my-6">
          <div className="w-full flex flex-col bg-white border-0 rounded-lg outline-none shadow-lg focus:outline-none">
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
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default BoardModal;

