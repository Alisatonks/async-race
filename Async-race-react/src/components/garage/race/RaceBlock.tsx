import { useEffect, useState } from 'react';
import CarBlock from './CarBlock';
import Loader from '../../loader/Loader';
import Alert from '../../alert/Alert';
import { CARS_PER_PAGE } from '../../../utils/constants';
import Pagination from '../../pagination/Pagination';
import { useGetAllCarsQuery } from '../../../redux/slices/carsSlice';

export default function RaceBlock() {
  const { data: cars, isLoading, error } = useGetAllCarsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [openError, setOpenError] = useState(false);

  const handleCloseAlert = () => {
    setOpenError(false);
  };

  useEffect(() => {
    if (error) {
      setOpenError(true);
    }
  }, [error]);

  const lastIndex = CARS_PER_PAGE * currentPage;
  const firstIndex = lastIndex - CARS_PER_PAGE;
  const carsOnPage = cars ? cars.slice(firstIndex, lastIndex) : [];

  return (
    <>
      {cars && cars.length && (
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
      {openError && <Alert handleCloseAlert={handleCloseAlert} />}
    </>
  );
}
