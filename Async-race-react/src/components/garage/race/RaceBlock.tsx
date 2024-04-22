import { useEffect, useState } from 'react';
import CarBlock from './CarBlock';
import getCars from '../../../utils/api';
import { Cars } from '../../../types';

export default function RaceBlock() {
  const [cars, setCars] = useState<Cars>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getAllCars = async () => {
      try {
        const res = await getCars();
        setCars(res);
      } catch (e) {
        setError(typeof e === 'string' ? e : (e as Error).message);
      }
    };
    getAllCars();
  }, []);

  console.log(cars);
  console.log(error);

  return (
    <div className="race">
      {cars.map((el) => (
        <CarBlock car={el} key={el.id} />
      ))}
    </div>
  );
}
