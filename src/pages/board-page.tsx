import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AppState, useAppDispatch, useAppSelector } from '../store/store';
import { getUsers } from '../store/users/users.slice';
import { getBoardById } from '../store/boards/boards.slice';
import { getColumnById, getColumns, updateColumn } from '../store/columns/columns.slice';
import ReactPortal from '../components/modal/portal';
import BoardAddColumnModal from '../components/board/board-add-column-modal';
import Column from '../components/column';
import TaskWindow from '../components/task/task-window';
import Spinner from '../components/spinner';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FormattedMessage } from 'react-intl';
import { MdSpaceDashboard } from 'react-icons/md'

const BoardPage = () => {
  const [cookie] = useCookies(['user']);
  const [isOpenAddColumnModal, setIsOpenAddColumnModal] = useState(false);
  const [isOpenTask, setIsOpenTask] = useState(false);

  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state: AppState) => state.user);
  const { boardColumnsTasks, isLoading } = useAppSelector((state: AppState) => state.boards);
  const { columnById, isSuccess: isSuccessUpdate } = useAppSelector((state: AppState) => state.columns);
  // const {  } = useAppSelector((state: AppState) => state.tasks);
  
  const navigate = useNavigate();

  const boardId = useParams().id;

  const handleTaskClick = () => {
    setIsOpenTask(!isOpenTask);
  };

  useEffect(() => {
    cookie.user === undefined && navigate('/');
    if (cookie.user && boardId) {
      dispatch(getBoardById(boardId));
      dispatch(getColumns(boardId));
      dispatch(getUsers());
    }
  }, [cookie.user, navigate, dispatch, boardId, isSuccessUpdate]);

  const handleDragStart = (result: any) => {
    const { draggableId, type, source } = result;
    if (type === 'COLUMN') {
      dispatch(
        getColumnById({
          boardId: source.droppableId,
          id: draggableId,
        })
      );
      console.log(result);
    }
  };

  const handleDragEnd = async (result: any) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    if (type === 'COLUMN' && columnById) {
      await dispatch(
        updateColumn({
          boardId: source.droppableId,
          id: draggableId,
          title: columnById.title,
          order: destination.index,
        })
      );
    }
    dispatch(getBoardById(source.droppableId));
    console.log(result);
  };

  if (isLoading) {
    return <div className='h-full my-auto flex justify-center items-center'>
      <Spinner />
    </div>
  }

  return (
    <main className="relative overflow-hidden h-full mb-auto bg-white flex flex-col items-start gap-5 px-5 text-gray-300">
      {!boardId ? (
        <Link
          to="/main"
          className="border-2 border-sky-400 rounded p-1 bg-gradient-to-r from-sky-500 to-indigo-500 "
        >
          Go to Main Page
        </Link>
      ) : (
        <>
          <section className="flex justify-center items-center text-center gap-3 py-3">
            <MdSpaceDashboard className='text-slate-blue' size={35} />
            <h1 className="text-3xl text-black font-bold">{boardColumnsTasks?.title}</h1>
          </section>
          <section className="flex gap-5 w-full h-full mb-10 items-start">
            <DragDropContext
              onDragStart={(result) => handleDragStart(result)}
              onDragEnd={(result) => handleDragEnd(result)}
            >
              <Droppable
                droppableId={boardId}
                key={boardId}
                direction="horizontal"
                type="COLUMN"
              >
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex gap-5 h-full flex-wrap"
                    >
                      {boardColumnsTasks.columns.length > 0 &&
                        boardColumnsTasks.columns.map((col, index) => (
                          <Draggable
                            key={col.id}
                            draggableId={col.id}
                            index={col.order}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  <Column
                                    key={col.id}
                                    id={col.id}
                                    order={col.order}
                                    title={col.title}
                                    tasks={col.tasks}
                                    users={users}
                                    taskClick={handleTaskClick}
                                  />
                                </div>
                              );
                            }}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </DragDropContext>
            <div className="relative flex justify-center items-center w-56 h-full">
              <>
                <button
                  onClick={() => setIsOpenAddColumnModal(true)}
                  className="relative w-full p-2 bg-slate-blue border-2 border-slate-blue rounded text-white text-lg font-bold hover:text-black hover:bg-transparent transition-all duration-300 ease-in-out"
                >
                  <FormattedMessage id="addColumn" />
                </button>
                {isOpenAddColumnModal && (
                  <ReactPortal showModal={isOpenAddColumnModal}>
                    <BoardAddColumnModal
                      setIsOpenAddColumnModal={setIsOpenAddColumnModal}
                    />
                  </ReactPortal>
                )}
              </>
            </div>
          </section>
          {isOpenTask && (
            <ReactPortal showModal={isOpenTask}>
              <TaskWindow
                isOpenTask={isOpenTask}
                taskClick={handleTaskClick}
                users={users}
              />
            </ReactPortal>
          )}
        </>
      )}
    </main>
  );
};

export default BoardPage;
