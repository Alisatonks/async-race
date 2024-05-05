import { useDispatch } from 'react-redux';
import { setError } from '../redux/slices/errorReducer';
import {
  useAddWinnerMutation,
  useUpdateWinnerMutation,
} from '../redux/slices/requestsApi';
import { getWinner } from '../utils/api';

const useHandleWinner = () => {
  const [addWinner] = useAddWinnerMutation();
  const [updateWinner] = useUpdateWinnerMutation();
  const dispatch = useDispatch();

  const handleWinner = async (winner: { id: number; time: number }) => {
    try {
      const winnerOnServer = await getWinner(winner.id);
      if (!winnerOnServer.id) {
        addWinner({ id: winner.id, wins: 1, time: winner.time });
      } else if (winner.time < winnerOnServer.time) {
        const wins = winnerOnServer.wins + 1;
        updateWinner({ id: winner.id, wins, time: winner.time });
      }
    } catch (e) {
      dispatch(setError(typeof e === 'string' ? e : 'Something went wrong'));
    }
  };

  return { handleWinner };
};

export default useHandleWinner;
