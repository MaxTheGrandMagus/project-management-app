import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AppState, useAppDispatch, useAppSelector } from '../store/store';
import { getBoards } from '../store/boards/boards.slice';
import BoardContainer from '../components/main/board-container';
import { FormattedMessage } from 'react-intl';
import { ImSpinner9 } from 'react-icons/im';

const MainPage = () => {
  const [cookie] = useCookies(['user']);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state: AppState) => state.boards);
  const navigate = useNavigate();

  useEffect(() => {
    cookie.user === undefined && navigate('/');
    if (cookie.user) {
      dispatch(getBoards());
    }
  }, [cookie.user, navigate, dispatch]);

  if (isLoading) {
    return <div className='h-full my-auto flex justify-center items-center'>
      <ImSpinner9 className='spinner' />
    </div>
  }

  return (
    <main className="h-full mb-auto relative flex flex-col gap-5 justify-start items-center text-gray-300">
      <h1 className="text-3xl font-bold text-black mt-6">
        <FormattedMessage id="titleBoardPage" />
      </h1>
      <BoardContainer />
    </main>
  );
};

export default MainPage;
