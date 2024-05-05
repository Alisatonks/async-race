import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCarsPositions,
  setMovingCars,
} from '../redux/slices/persistentStateReducer';
import { RootState } from '../redux/store';

function useAnimateCar(id: number) {
  const [finisher, setFinisher] = useState<number | undefined>();

  const carRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const positionRef = useRef<number>(0);

  const carsPositions = useSelector(
    (state: RootState) => state.persistentState.carsPositions
  );

  useEffect(() => {
    if (carsPositions[id]) {
      if (carRef.current) {
        carRef.current.style.transform = `translateX(${carsPositions[id]}px)`;
        positionRef.current = carsPositions[id] || 0;
      }
    }
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (carRef.current && carRef.current.style.transform) {
        const lastPosition = carRef.current.style.transform
          .split('(')[1]
          .replace('px)', '');
        dispatch(setCarsPositions({ id, position: Number(lastPosition) }));
      }
    };
  }, [dispatch, id]);

  const moveCar = useCallback(
    (distance: number, velocity: number) => {
      const time = distance / velocity / 1000;
      dispatch(setMovingCars({ id, isMoving: true }));

      const moveCarFrame = () => {
        if (carRef.current && trackRef.current) {
          const width = Number(trackRef.current?.offsetWidth) - 80;
          positionRef.current += width / time / 60;
          carRef.current.style.transform = `translateX(${positionRef.current}px)`;
          if (positionRef.current < width) {
            requestRef.current = requestAnimationFrame(moveCarFrame);
          } else {
            setFinisher(Number(time.toFixed(2)));
          }
        }
      };
      requestRef.current = requestAnimationFrame(moveCarFrame);
    },
    [dispatch, id]
  );

  const pauseCar = useCallback(() => {
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  }, []);

  const stopCar = useCallback(() => {
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
    positionRef.current = 0;
    if (carRef.current) {
      carRef.current.style.transform = `translateX(${positionRef.current}px)`;
    }
    dispatch(setMovingCars({ id, isMoving: undefined }));
  }, [dispatch, id]);

  const setCarRef = useCallback((ref: HTMLDivElement | null) => {
    carRef.current = ref;
  }, []);

  const setTrackRef = useCallback((ref: HTMLDivElement | null) => {
    trackRef.current = ref;
  }, []);

  return {
    moveCar,
    pauseCar,
    setCarRef,
    stopCar,
    finisher,
    setFinisher,
    setTrackRef,
  };
}

export default useAnimateCar;
