
import { useAppDispatch } from "../../store/store";
import { deleteBoard } from "../../store/boards/boardsSlice";
import BoardButton, { themes } from "./board-button";
import { ModalProps } from "../interfaces";
import { FormattedMessage } from "react-intl";

const ModalWindow = (props: ModalProps) => {
  const dispatch = useAppDispatch();

  const onCloseHandler = () => {
    dispatch(deleteBoard(props.boardId))
    props.toggleWindow()
  }

  const onCancelHandler = () => {
    props.toggleWindow()
  }
  
  return (
    <div className={`flex boardsModal max-w-md max-h-20 absolute rounded z-30 bg-sky-900 inset-x-auto inset-y-80 m-4 p-4 items-center  `}>
      <div className="mr-4 "><FormattedMessage id='deleteBoard' /></div>
      <div className="flex">
        <BoardButton themes={themes.light} text="yes" onClick={onCloseHandler} />
        <BoardButton themes={themes.light} text="no" onClick={onCancelHandler} />
      </div>
    </div>
  )
}

export default ModalWindow;

