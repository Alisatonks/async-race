import { useEffect, useState } from 'react';
import CarBlock from './CarBlock';
import getCars from '../../../utils/api';
import { Cars } from '../../../types';
import Loader from '../../loader/Loader';
import Alert from '../../alert/Alert';
import CARS_PER_PAGE from '../../../utils/constants';
import Pagination from '../../pagination/Pagination';

export default function RaceBlock() {
  const [cars, setCars] = useState<Cars>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const lastIndex = CARS_PER_PAGE * currentPage;
  const firstIndex = lastIndex - CARS_PER_PAGE;
  const carsOnPage = cars.slice(firstIndex, lastIndex);

  console.log(cars);
  console.log(error);

  return (
    <>
      {!isLoading && cars.length && (
        <div className="race">
          {carsOnPage.map((el) => (
            <CarBlock car={el} key={el.id} />
          ))}
          <Pagination
            pageName="garage"
            numberOfCars={cars.length}
            currentPage={currentPage}
            setPage={setCurrentPage}
          />
        </div>
      )}
      {isLoading && <Loader />}
      {open && <Alert handleCloseAlert={handleCloseAlert} error={error} />}
    </>
  );
}
