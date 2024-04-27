import {
  useGetWinnersQuery,
  useAddWinnerMutation,
  useUpdateWinnerMutation,
} from '../redux/slices/requestsApi';

const useHandleWinner = () => {
  const { data: winners } = useGetWinnersQuery();
  const [addWinner] = useAddWinnerMutation();
  const [updateWinner] = useUpdateWinnerMutation();

  const handleWinner = (winner: { id: number; time: number }) => {
    const winnerIndex = winners?.findIndex((el) => el.id === winner.id);

    if (winners) {
      if (winnerIndex === -1) {
        addWinner({ id: winner.id, wins: 1, time: winner.time });
      } else if (winnerIndex !== undefined && winnerIndex !== -1) {
        if (winner.time < winners[winnerIndex].time) {
          const wins = winners[winnerIndex].wins + 1;
          updateWinner({ id: winner.id, wins, time: winner.time });
        }
      }
    }
  };
  return { handleWinner };
};

export default useHandleWinner;
