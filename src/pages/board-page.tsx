import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AppState, useAppDispatch, useAppSelector } from '../store/store';
import { getUsers } from '../store/users/users.slice';
import { getBoardById } from '../store/boards/boards.slice';
import { getColumnById, getColumns, updateColumn } from '../store/columns/columns.slice';
import { getTaskById, updateTask } from '../store/tasks/tasks.slice';
import ReactPortal from '../components/modal/portal';
import BoardAddColumnModal from '../components/board/board-add-column-modal';
import Column from '../components/column';
import Spinner from '../components/spinner';
import { DragDropContext, Droppable, Draggable, DragStart, DropResult } from 'react-beautiful-dnd';
import { FormattedMessage } from 'react-intl';
import { MdSpaceDashboard } from 'react-icons/md'

const BoardPage = () => {
  const [cookie] = useCookies(['user']);
  const [isOpenAddColumnModal, setIsOpenAddColumnModal] = useState(false);

  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state: AppState) => state.users);
  const { boardColumnsTasks, isLoading } = useAppSelector((state: AppState) => state.boards);
  const { columnById } = useAppSelector((state: AppState) => state.columns);
  const { currentTask } = useAppSelector((state: AppState) => state.tasks);
  
  const navigate = useNavigate();

  const boardId = useParams().id as string;

  useEffect(() => {
    cookie.user === undefined && navigate('/');
    if (cookie.user && boardId) {
      dispatch(getBoardById(boardId));
      dispatch(getColumns(boardId));
      dispatch(getUsers());
    }
  }, [cookie.user, navigate, dispatch, boardId]);

  const handleDragStart = (result: DragStart) => {
    const { draggableId, type, source } = result;
    if (type === 'COLUMN') {
      dispatch(
        getColumnById({
          boardId: source.droppableId,
          id: draggableId,
        })
      );
      // console.log('DS COLUMN', result);
    }
    if (type === 'TASK') {
      dispatch(getTaskById({
        boardId: boardId,
        columnId: source.droppableId,
        id: draggableId,
      }));
      // console.log('DS TASK', result);
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    if (type === 'COLUMN' && columnById) {
      await dispatch(
        updateColumn({
          boardId: source.droppableId,
          id: draggableId,
          title: columnById.title,
          order: destination.index,
        })
      );
      dispatch(getBoardById(boardId));
      // console.log('DE COLUMN', result);
    }
    if (type === 'TASK' && currentTask) {
      if (destination.index === 0) {
        await dispatch(
          updateTask({
            boardId: boardId,
            columnId: source.droppableId,
            id: draggableId,
            task: {
              title: currentTask.title,
              description: currentTask.description,
              order: destination.index + 1,
              userId: currentTask.userId,
              boardId: boardId,
              columnId: destination.droppableId,
            }
          })
        );
        dispatch(getBoardById(boardId));
      } else {
        await dispatch(
          updateTask({
            boardId: boardId,
            columnId: source.droppableId,
            id: draggableId,
            task: {
              title: currentTask.title,
              description: currentTask.description,
              order: destination.index,
              userId: currentTask.userId,
              boardId: boardId,
              columnId: destination.droppableId,
            }
          })
        );
        dispatch(getBoardById(boardId));
      }
      // console.log('DE TASK', result);
    }
  };

  if (isLoading) {
    return <div className='h-full my-auto flex justify-center items-center'>
      <Spinner />
    </div>
  }

  return (
    <main className="relative overflow-hidden h-full mb-auto bg-white flex flex-col items-start px-5 text-gray-300">
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
          <section className="board-scroll overflow-x-auto w-full h-full flex items-start gap-5 mb-3 py-5">
            <DragDropContext
              onDragStart={(result) => handleDragStart(result)}
              onDragEnd={(result) => handleDragEnd(result)}
            >
              <Droppable
                key={boardId}
                droppableId={boardId}
                direction="horizontal"
                type="COLUMN"
              >
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex gap-5"
                    >
                      {boardColumnsTasks.columns.length > 0 &&
                        boardColumnsTasks.columns.map((column) => (
                          <Draggable
                            key={column.id}
                            draggableId={column.id}
                            index={column.order}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                    height: '100%',
                                  }}
                                >
                                  <Column
                                    key={column.id}
                                    id={column.id}
                                    order={column.order}
                                    title={column.title}
                                    tasks={column.tasks}
                                    users={users}
                                  />
                                </div>
                              );
                            }}
                          </Draggable>
                        ))
                      }
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </DragDropContext>
            <button
              onClick={() => setIsOpenAddColumnModal(true)}
              className="w-auto h-full whitespace-nowrap text-center p-2 bg-slate-blue border-2 border-slate-blue rounded text-white text-lg font-bold hover:text-black hover:bg-transparent transition-all duration-300 ease-in-out"
            >
              <FormattedMessage id="addColumn" />
            </button>
          </section>
          {isOpenAddColumnModal && (
            <ReactPortal showModal={isOpenAddColumnModal}>
              <BoardAddColumnModal
                setIsOpenAddColumnModal={setIsOpenAddColumnModal}
              />
            </ReactPortal>
          )}
        </>
      )}
    </main>
  );
};

export default BoardPage;
