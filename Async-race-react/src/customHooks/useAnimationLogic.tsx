import { useCallback } from 'react';
import { EngineStatus } from '../types';
import { startDriveMode, startStopEngine } from '../utils/api';

const useAnimationLogic = (
  carId: number,
  moveCar: (velocity: number, disrance: number) => void,
  pauseCar: () => void,
  stopCar: () => void,
  setIsMoving: (isMoving: boolean) => void
) => {
  const stopAnimation = useCallback(
    async (type?: string) => {
      if (!type) {
        pauseCar();
      }
      if (type === 'stop') {
        try {
          await startStopEngine(carId, EngineStatus.Stopped);
        } catch (e) {
          console.log(e);
        }
        stopCar();
        setIsMoving(false);
      }
    },
    [carId, pauseCar, stopCar, setIsMoving]
  );

  const driveRequest = useCallback(async () => {
    try {
      const res = await startDriveMode(carId, EngineStatus.Drive);
      if (res === 500) {
        stopAnimation();
      }
    } catch (e) {
      console.log(e);
    }
  }, [carId, stopAnimation]);

  const startAnimation = useCallback(async () => {
    try {
      setIsMoving(true);
      const res = await startStopEngine(carId, EngineStatus.Started);
      if (res) {
        moveCar(res.distance, res.velocity);
        driveRequest();
      }
    } catch (e) {
      console.log(e);
    }
  }, [carId, moveCar, setIsMoving, driveRequest]);

  return { stopAnimation, startAnimation };
};

export default useAnimationLogic;
