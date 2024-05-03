import { useDispatch } from 'react-redux';
import {
  setVelocity,
  setDistance,
  setCarsPositions,
  setStatuses,
  setStartRace,
  setMovingCars,
} from '../redux/slices/persistentStateReducer';

export default function useDeleteStoreValues() {
  const dispatch = useDispatch();

  const deleteStoreValues = () => {
    dispatch(setStartRace(false));
    dispatch(setStatuses({}));
    dispatch(setVelocity({}));
    dispatch(setDistance({}));
    dispatch(setCarsPositions({}));
    dispatch(setMovingCars({}));
  };

  return { deleteStoreValues };
}
