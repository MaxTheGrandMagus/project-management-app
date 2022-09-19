import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AppState, useAppDispatch, useAppSelector } from '../store/store';
import { getBoards } from '../store/boards/boards.slice';
import BoardContainer from '../components/main/board-container';
import Spinner from '../components/spinner';
import { FormattedMessage } from 'react-intl';

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

  return (
    <main className="h-full mb-auto relative flex flex-col gap-5 justify-start items-center text-gray-300">
      <h1 className="text-3xl font-bold text-black mt-6">
        <FormattedMessage id="titleBoardPage" />
      </h1>
      {isLoading ? <Spinner /> : <BoardContainer />}
    </main>
  );
};

export default MainPage;
