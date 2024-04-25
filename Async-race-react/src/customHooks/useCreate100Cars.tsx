import { useState } from 'react';
import { useAddCarMutation } from '../redux/slices/carsSlice';
import { CreatingCar } from '../types';
import { CARS_BRANDS, CARS_MODELS } from '../utils/constants';

function useCreate100Cars() {
  const [addCar] = useAddCarMutation();
  const [isLoading, setIsLoading] = useState(false);

  const generateCarName = () => {
    const brand = CARS_BRANDS[Math.floor(Math.random() * 10)];
    const model = CARS_MODELS[Math.floor(Math.random() * 10)];
    return `${brand} ${model}`;
  };

  const generateCarColor = () => {
    const color = `#${`${Math.random().toString(16)}000000`.substring(2, 8).toUpperCase()}`;
    return color;
  };

  const createCarsPromise = async () => {
    setIsLoading(true);
    try {
      const carsArray: CreatingCar[] = Array.from({ length: 100 }, () => {
        return {
          name: generateCarName(),
          color: generateCarColor(),
        };
      });

      await Promise.all(
        carsArray.map(async (car) => {
          await addCar(car);
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { createCarsPromise, isLoading };
}

export default useCreate100Cars;
