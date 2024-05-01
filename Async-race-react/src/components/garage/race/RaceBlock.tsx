import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CarBlock from './CarBlock';
import Loader from '../../loader/Loader';
import Alert from '../../alert/Alert';
import Pagination from '../../pagination/Pagination';
import { useGetAllCarsQuery } from '../../../redux/slices/requestsApi';
import Form from '../controls/Form';
import useCreate100Cars from '../../../customHooks/useCreate100Cars';
import WinnerModal from './modal/WinnerModal';
import { Finisher } from '../../../types';
import useHandleWinner from '../../../customHooks/useHandleWinner';
import { RootState } from '../../../redux/store';

export default function RaceBlock() {
  const currentPage = useSelector(
    (state: RootState) => state.persistentState.currentPageGarage
  );
  const { data, isLoading, error, refetch } = useGetAllCarsQuery(currentPage);
  const cars = data?.carsData;
  const totalCars = Number(data?.totalCars);

  const { createCarsPromise, isLoading: isGenerating } = useCreate100Cars();

  const [openError, setOpenError] = useState(false);
  const [startRace, setStartRace] = useState(false);
  const [reset, setReset] = useState(false);
  const [finishers, setFinishers] = useState<Finisher[]>([]);
  const [winner, setWinner] = useState<Finisher | undefined>(undefined);
  const [openWinnerModal, setOpenWinnerModal] = useState(false);
  const [stopEngines, setStopEngines] = useState(false);

  const { handleWinner } = useHandleWinner();
  const handleCloseAlert = () => {
    setOpenError(false);
  };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  useEffect(() => {
    if (error) {
      setOpenError(true);
    }
  }, [error]);
  console.log(
    'finishers.length',
    finishers.length,
    'startRace',
    startRace,
    '!winner',
    !winner
  );
  useEffect(() => {
    if (finishers.length && startRace && !winner) {
      setOpenWinnerModal(true);
      setWinner(finishers[0]);
      handleWinner({
        id: finishers[0].id,
        time: finishers[0].time,
      });
    }
  }, [finishers, handleWinner, startRace, winner]);

  const handleStartRace = () => {
    setStartRace(true);
    setWinner(undefined);
    setFinishers([]);
  };

  const handleReset = () => {
    setReset(true);
    setFinishers([]);
  };

  const handleResetRace = () => {
    handleReset();
    setStopEngines(true);
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
          <button className="commonBtn" type="button" onClick={handleResetRace}>
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
      {cars && (
        <div className="race">
          {cars.map((el) => (
            <CarBlock
              car={el}
              key={el.id}
              startRace={startRace}
              reset={reset}
              setReset={setReset}
              addFinisher={addFinisher}
              setStartRace={setStartRace}
              stopEngines={stopEngines}
              setStopEngines={setStopEngines}
            />
          ))}
          <Pagination
            pageName="garage"
            numberOfCars={totalCars}
            currentPage={currentPage}
            handleReset={handleReset}
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
