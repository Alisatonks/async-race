import { useEffect, useState } from 'react';
import CarBlock from './CarBlock';
import getCars from '../../../utils/api';
import { Cars } from '../../../types';
import Loader from '../../loader/Loader';
import Alert from '../../alert/Alert';

export default function RaceBlock() {
  const [cars, setCars] = useState<Cars>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getAllCars = async () => {
      try {
        const res = await getCars();
        setCars(res);
      } catch (e) {
        setError(typeof e === 'string' ? e : 'Sorry, something went wrong');
        setOpen(true);
      } finally {
        setIsLoading(false);
      }
    };
    getAllCars();
  }, []);

  const handleCloseAlert = () => {
    setOpen(false);
  };

  console.log(cars);
  console.log(error);

  return (
    <>
      {!isLoading && cars.length && (
        <div className="race">
          {cars.map((el) => (
            <CarBlock car={el} key={el.id} />
          ))}
        </div>
      )}
      {isLoading && <Loader />}
      {open && <Alert handleCloseAlert={handleCloseAlert} error={error} />}
    </>
  );
}
