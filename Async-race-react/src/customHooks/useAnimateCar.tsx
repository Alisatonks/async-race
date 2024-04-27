import { useEffect, useRef, useState } from 'react';

function useAnimateCar(trackLength: number | undefined) {
  const [finisher, setFinisher] = useState<boolean>(false);

  const carRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);
  let position = 0;
  const car = carRef.current;
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const moveCar = (distance: number, velocity: number) => {
    const time = distance / velocity / 1000;

    const moveCarFrame = () => {
      if (car && trackLength) {
        const width = trackLength - 64;
        position += width / time / 60;
        car.style.transform = `translateX(${position}px)`;
        if (position < width) {
          requestRef.current = requestAnimationFrame(moveCarFrame);
        } else {
          setFinisher(true);
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
    position = 0;
    if (car) {
      car.style.transform = `translateX(${position}px)`;
    }
  };

  const setCarRef = (ref: HTMLDivElement | null) => {
    carRef.current = ref;
  };

  return { moveCar, pauseCar, setCarRef, stopCar, finisher, setFinisher };
}

export default useAnimateCar;
