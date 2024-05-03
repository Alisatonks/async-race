import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CarBlock from './CarBlock';
import Loader from '../../loader/Loader';
import Alert from '../../alert/Alert';
import Pagination from '../../pagination/Pagination';
import { useGetAllCarsQuery } from '../../../redux/slices/requestsApi';
import Form from '../controls/Form';
import useCreate100Cars from '../../../customHooks/useCreate100Cars';
import WinnerModal from './modal/WinnerModal';
import { EngineStatus, Finisher } from '../../../types';
import useHandleWinner from '../../../customHooks/useHandleWinner';
import { RootState } from '../../../redux/store';
import { setStartRace } from '../../../redux/slices/persistentStateReducer';
import { startStopEngine } from '../../../utils/api';
import useDeleteStoreValues from '../../../customHooks/useDeleteStoreValues';

export default function RaceBlock() {
  const currentPage = useSelector(
    (state: RootState) => state.persistentState.currentPageGarage
  );
  const startRace = useSelector(
    (state: RootState) => state.persistentState.startRace
  );

  const { data, isLoading, error, refetch } = useGetAllCarsQuery(currentPage);
  const cars = data?.carsData;
  const totalCars = Number(data?.totalCars);
  const dispatch = useDispatch();

  const { createCarsPromise, isLoading: isGenerating } = useCreate100Cars();

  const [openError, setOpenError] = useState(false);
  const [reset, setReset] = useState(false);
  const [finishers, setFinishers] = useState<Finisher[]>([]);
  const [winner, setWinner] = useState<Finisher | undefined>(undefined);
  const [openWinnerModal, setOpenWinnerModal] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const { handleWinner } = useHandleWinner();
  const handleCloseAlert = () => {
    setOpenError(false);
  };

  const { deleteStoreValues } = useDeleteStoreValues();

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  useEffect(() => {
    if (error) {
      setOpenError(true);
    }
  }, [error]);

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
    dispatch(setStartRace(true));
    setWinner(undefined);
  };

  const handleReset = () => {
    setReset(true);
    setFinishers([]);
    deleteStoreValues();
  };

  async function stopEnginesPr(array: { id: number }[]) {
    try {
      setIsResetting(true);
      const stopPromises = array.map((car) =>
        startStopEngine(car.id, EngineStatus.Stopped)
      );
      await Promise.all(stopPromises);
    } catch (e) {
      console.error('Failed to stop all engines:', e);
    } finally {
      setIsResetting(false);
    }
  }

  const handleResetRace = () => {
    handleReset();
    if (cars) {
      stopEnginesPr(cars);
    }
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
            className={
              startRace || isResetting ? 'commonBtn disabled' : 'commonBtn'
            }
            type="button"
            onClick={handleStartRace}
            disabled={startRace || isResetting}
          >
            Race
          </button>
          <button className="commonBtn" type="button" onClick={handleResetRace}>
            {isResetting ? '...Resetting' : 'Reset'}
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
