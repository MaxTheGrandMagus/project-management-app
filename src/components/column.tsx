import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { ITask } from '../store/boards/boards.slice';
import { deleteColumn } from '../store/columns/columns.slice';
import Task from './task/task';
import ReactPortal from './modal/portal';
import TaskCreateModal from './task/task-create-modal';
import TaskUpdateModal from './task/task-update-modal';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FormattedMessage } from 'react-intl';
import { HiDotsHorizontal, HiOutlineTrash } from 'react-icons/hi'
import { UserProps } from '../interfaces/interfaces';

const Column = ({ id, title, order, tasks, users }: {
  id: string;
  title: string;
  order: number;
  tasks: Array<ITask>;
  users: Array<UserProps>;
}) => {
  const [visibleColumnOptions, setVisibleColumnOptions] = useState(false);
  const [isOpenCreateTaskModal, setIsOpenCreateTaskModal] = useState(false);
  const [isOpenUpdateTaskModal, setIsOpenUpdateTaskModal] = useState(false);
  
  const dispatch = useAppDispatch();
  
  const boardId = useParams().id;

  const toggleColumnOptions = () => {
    setVisibleColumnOptions(!visibleColumnOptions);
  };
  
  const toggeTaskCreateModal = () => {
    setIsOpenCreateTaskModal(!isOpenCreateTaskModal);
  };

  const toggeTaskUpdateModal = () => {
    setIsOpenUpdateTaskModal(!isOpenUpdateTaskModal);
  };

  const handleColumnDelete = (id: string) => {
    if (boardId) {
      dispatch(deleteColumn({ 
        boardId: boardId, 
        id: id 
      }));
    }
  };

  return (
    <article
      key={id}
      className="relative overflow-visible w-60 h-auto bg-slate-blue border rounded border-slate-blue shadow-lg"
    >
      <div className="flex justify-between align-baseline">
        <h4 className="w-full text-lg text-white font-bold m-3">{title}</h4>
        <div
          className="relative flex items-center m-3 text-white cursor-pointer rounded-sm hover:bg-gray-300 transition-all"
          onClick={toggleColumnOptions}
        >
          {visibleColumnOptions && (
            <div className="absolute z-10 top-full left-0 flex flex-col bg-sky-800">
              <button
                className='flex p-1 z-10 whitespace-nowrap font-bold text-lg'
                onClick={() => handleColumnDelete(id)}
              >
                <HiOutlineTrash size={24} />
              </button>
            </div>
          )}
          <HiDotsHorizontal size={24} />
        </div>
      </div>
      <div className="column-scroll relative overflow-y-auto max-h-[45vh] h-auto flex flex-col">
        <Droppable
          key={id}
          droppableId={id}
          direction="vertical"
          type="TASK"
        >
          {(provided) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col min-h-[2rem] h-auto"
              >
                {tasks.length > 0 &&
                  tasks.map((task) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={task.order}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              height: '100%',
                              padding: '0 0.5rem',
                            }}
                          >
                            <Task
                              key={task.id}
                              columnId={id}
                              task={task}
                              users={users}
                              toggleWindow={toggeTaskUpdateModal}
                            />
                          </div>
                        )
                      }}
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
      <div className="flex flex-col items-center m-2">
        <button
          onClick={toggeTaskCreateModal}
          className="w-full h-full text-white text-lg font-bold rounded-sm hover:bg-white hover:text-black transition-all"
        >
          <FormattedMessage id="addTask" />
        </button>
      </div>
      {isOpenCreateTaskModal && (
        <ReactPortal showModal={isOpenCreateTaskModal}>
          <TaskCreateModal
            columnId={id}
            order={order}
            toggleWindow={toggeTaskCreateModal}
          />
        </ReactPortal>
      )}
      {isOpenUpdateTaskModal && (
        <ReactPortal showModal={isOpenUpdateTaskModal}>
          <TaskUpdateModal
            users={users}
            toggleWindow={toggeTaskUpdateModal}
          />
        </ReactPortal>
      )}
    </article>
  );
};

export default Column;
