import { closeWindow, deleteBoard } from "../../store/boards/boardsSlice";
import { useAppDispatch } from "../../store/store";
import BoardButton from "./boardButton";

const ModalWindow = (props: IModal) => {
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(deleteBoard(props.boardId))
    dispatch(closeWindow(props.boardId))
  }
  
  return (
    <div className="boardsModal hidden absolute rounded z-20 bg-sky-900 inset-100px m-4 p-4 items-center  ">
      <div className="mr-4 ">Do you ready want to delete this board?</div>
      <div>
      <BoardButton text="Yes" onClick={close} />
      <BoardButton text="No" onClick={() => dispatch(closeWindow(props.boardId))} />
      </div>
    </div>
  )
}

export default ModalWindow;

interface IModal {
  boardId: string, 
  onClick?: React.MouseEventHandler<HTMLButtonElement> |  undefined
}