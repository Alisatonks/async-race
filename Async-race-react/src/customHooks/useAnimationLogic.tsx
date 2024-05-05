import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EngineStatus } from '../types';
import { startDriveMode, startStopEngine } from '../utils/api';
import {
  setVelocity,
  setDistance,
  setStatuses,
} from '../redux/slices/persistentStateReducer';
import { RootState } from '../redux/store';
import { setError } from '../redux/slices/errorReducer';

const useAnimationLogic = (
  carId: number,
  moveCar: (velocity: number, distance: number) => void,
  pauseCar: () => void,
  stopCar: () => void
) => {
  const dispatch = useDispatch();
  const carsVelocity = useSelector(
    (state: RootState) => state.persistentState.velocity
  );
  const carsDistance = useSelector(
    (state: RootState) => state.persistentState.distance
  );

  const stopAnimation = useCallback(
    async (type?: string) => {
      if (!type) {
        pauseCar();
      }
      if (type === 'stop') {
        stopCar();
        dispatch(setVelocity({ id: carId, velocity: undefined }));
      }
      dispatch(setStatuses({ id: carId, status: 1 }));
    },
    [pauseCar, stopCar, dispatch, carId]
  );

  const driveRequest = useCallback(async () => {
    try {
      const res = await startDriveMode(carId, EngineStatus.Drive);
      if (res === 500) {
        stopAnimation();
      }
    } catch (e) {
      throw new Error(typeof e === 'string' ? e : 'Something went wrong');
    }
  }, [carId, stopAnimation]);

  const startAnimation = useCallback(async () => {
    if (
      carsVelocity[carId] !== undefined &&
      carsDistance[carId] !== undefined
    ) {
      moveCar(carsDistance[carId]!, carsVelocity[carId]!);
    } else {
      try {
        const res = await startStopEngine(carId, EngineStatus.Started);
        if (res) {
          moveCar(res.distance, res.velocity);
          driveRequest();
          dispatch(setVelocity({ id: carId, velocity: res.velocity }));
          dispatch(setDistance({ id: carId, distance: res.distance }));
        }
      } catch (e) {
        dispatch(setError(typeof e === 'string' ? e : 'Something went wrong'));
      }
    }
  }, [carId, carsDistance, carsVelocity, dispatch, driveRequest, moveCar]);

  return { stopAnimation, startAnimation };
};

export default useAnimationLogic;
