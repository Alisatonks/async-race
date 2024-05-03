import { useDispatch, useSelector } from 'react-redux';
import {
  useDeleteCarMutation,
  useDeleteWinnerMutation,
} from '../redux/slices/requestsApi';
import { RootState } from '../redux/store';
import { setSelectedCar } from '../redux/slices/selectedCarReducer';
import { getWinner } from '../utils/api';

export default function useDeleteCar() {
  const [deleteCar] = useDeleteCarMutation();
  const dispatch = useDispatch();
  const selectedCar = useSelector(
    (state: RootState) => state.selectedCar.selectedCar
  );
  const [deleteWinner] = useDeleteWinnerMutation();

  const handleDeleteCar = async (id: number) => {
    if (id === selectedCar?.id) {
      dispatch(setSelectedCar(null));
    }
    await deleteCar(id);
    const handleWinner = async () => {
      try {
        const winner = await getWinner(id);
        if (winner.id) {
          deleteWinner(id);
        }
      } catch (e) {
        console.log(e);
      }
    };
    handleWinner();
  };

  return { handleDeleteCar };
}
