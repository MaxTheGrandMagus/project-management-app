import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AppState, useAppDispatch, useAppSelector } from '../store/store';
import { getBoards } from '../store/boards/boardsSlice';
import BoardContainer from '../components/main-route/board-container';
import Spinner from '../components/spinner';
import { FormattedMessage } from 'react-intl';

const MainPage = () => {
  const [cookie] = useCookies(['user']);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: AppState) => state.boards);
  const navigate = useNavigate();

  useEffect(() => {
    cookie.user === undefined && navigate('/');
    if (cookie.user) {
      dispatch(getBoards());
    }
  }, [cookie.user, navigate, dispatch]);

  return (
    <main className="min-h-[65vh] items-center text-gray-300 justify-start flex flex-col gap-5 relative">
      <h1 className="text-3xl  ">
        <FormattedMessage id="titleBoardPage" />
      </h1>
      {loading ? <Spinner /> : <BoardContainer />}
    </main>
  );
};

export default MainPage;
