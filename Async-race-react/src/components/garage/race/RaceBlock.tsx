import { useEffect, useState } from 'react';
import CarBlock from './CarBlock';
import Loader from '../../loader/Loader';
import Alert from '../../alert/Alert';
import { CARS_PER_PAGE } from '../../../utils/constants';
import Pagination from '../../pagination/Pagination';
import { useGetAllCarsQuery } from '../../../redux/slices/carsSlice';
import Form from '../controls/Form';
import useCreate100Cars from '../../../customHooks/useCreate100Cars';
import WinnerModal from './modal/WinnerModal';
import { Finisher } from '../../../types';

export default function RaceBlock() {
  const { data: cars, isLoading, error } = useGetAllCarsQuery();
  const { createCarsPromise, isLoading: isGenerating } = useCreate100Cars();
  const [currentPage, setCurrentPage] = useState(1);
  const [openError, setOpenError] = useState(false);

  const [startRace, setStartRace] = useState(false);
  const [reset, setReset] = useState(false);
  const [finishers, setFinishers] = useState<Finisher[]>([]);
  const [winner, setWinner] = useState<Finisher | undefined>(undefined);
  const [openWinnerModal, setOpenWinnerModal] = useState(false);

  const handleCloseAlert = () => {
    setOpenError(false);
  };

  useEffect(() => {
    if (error) {
      setOpenError(true);
    }
  }, [error]);

  useEffect(() => {
    if (finishers.length && startRace && !winner) {
      setOpenWinnerModal(true);
      setWinner(finishers[0]);
    }
  }, [finishers, startRace, winner]);

  const lastIndex = CARS_PER_PAGE * currentPage;
  const firstIndex = lastIndex - CARS_PER_PAGE;
  const carsOnPage = cars ? cars.slice(firstIndex, lastIndex) : [];

  const handleStartRace = () => {
    setStartRace(true);
    setWinner(undefined);
    setFinishers([]);
  };

  const handleReset = () => {
    setStartRace(false);
    setReset(true);
    setFinishers([]);
  };

  const generate100Cars = async () => {
    await createCarsPromise();
  };

  const addFinisher = (finisher: Finisher) => {
    setFinishers([...finishers, finisher]);
  };

  const handleCloseWinnerModal = () => {
    setOpenWinnerModal(false);
  };

  return (
    <>
      <div className="controls">
        <div className="controls__group">
          <button
            className={startRace ? 'commonBtn disabled' : 'commonBtn'}
            type="button"
            onClick={handleStartRace}
            disabled={startRace}
          >
            Race
          </button>
          <button className="commonBtn" type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
        <Form action="create" />
        <Form action="update" />
        <div className="controls__group">
          <button
            className="commonBtn"
            type="button"
            onClick={generate100Cars}
            disabled={isGenerating}
          >
            {isGenerating ? '...Generating' : 'Generate cars'}
          </button>
        </div>
      </div>
      {cars && cars.length && (
        <div className="race">
          {carsOnPage.map((el) => (
            <CarBlock
              car={el}
              key={el.id}
              startRace={startRace}
              reset={reset}
              setReset={setReset}
              addFinisher={addFinisher}
            />
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
      {openWinnerModal && winner && (
        <WinnerModal winner={winner} handleClose={handleCloseWinnerModal} />
      )}
    </>
  );
}
