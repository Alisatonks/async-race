import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCarsPositions,
  setMovingCars,
} from '../redux/slices/persistentStateReducer';
import { RootState } from '../redux/store';

function useAnimateCar(trackLength: number | undefined, id: number) {
  const [finisher, setFinisher] = useState<number | undefined>();

  const carRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);

  const carsPositions = useSelector(
    (state: RootState) => state.persistentState.carsPositions
  );

  // let position = 0;
  const positionRef = useRef<number>(0);

  useEffect(() => {
    if (carsPositions[id]) {
      if (carRef.current) {
        carRef.current.style.transform = `translateX(${carsPositions[id]}px)`;
        positionRef.current = carsPositions[id] || 0;
      }
    }
  }, [carsPositions, id]);

  const dispatch = useDispatch();

  const car = carRef.current;

  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (carRef.current && carRef.current.style.transform) {
        const lastPosition = carRef.current.style.transform
          .split('(')[1]
          .replace('px)', '');
        dispatch(setCarsPositions({ id, position: Number(lastPosition) }));
      }
    };
  }, [dispatch, id]);

  const moveCar = (distance: number, velocity: number) => {
    const time = distance / velocity / 1000;
    dispatch(setMovingCars({ id, isMoving: true }));

    const moveCarFrame = () => {
      if (carRef.current && carRef.current.parentElement?.offsetWidth) {
        const width = Number(carRef.current.parentElement?.offsetWidth) - 80;
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
  };
  const pauseCar = () => {
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  };

  const stopCar = () => {
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
    positionRef.current = 0;
    if (car) {
      car.style.transform = `translateX(${positionRef.current}px)`;
    }
    dispatch(setMovingCars({ id, isMoving: undefined }));
  };

  const setCarRef = (ref: HTMLDivElement | null) => {
    carRef.current = ref;
  };

  return { moveCar, pauseCar, setCarRef, stopCar, finisher, setFinisher };
}

export default useAnimateCar;
