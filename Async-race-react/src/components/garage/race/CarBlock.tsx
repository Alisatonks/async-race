/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { Car, EngineStatus, Finisher } from '../../../types';
import Car2Svg from '../../car/car2Svg';
import Finish from '../../svg/Finish';
import { setSelectedCar } from '../../../redux/slices/selectedCarReducer';
import useAnimateCar from '../../../customHooks/useAnimateCar';
import useTrackLength from '../../../customHooks/useTrackLength';
import useAnimationLogic from '../../../customHooks/useAnimationLogic';
import {
  setInputUpdate,
  setStatuses,
  setVelocity,
  setDistance,
  setCarsPositions,
  setMovingCars,
} from '../../../redux/slices/persistentStateReducer';
import { startStopEngine } from '../../../utils/api';
import useDeleteCar from '../../../customHooks/useDeleteCar';
import { RootState } from '../../../redux/store';

type Props = {
  car: Car;
  startRace: boolean;
  reset: boolean;
  setReset: (reset: boolean) => void;
  addFinisher: (finisher: Finisher) => void;
};

export default function CarBlock(props: Props) {
  const { car, startRace, reset, setReset, addFinisher } = props;

  const carsStatuses = useSelector(
    (state: RootState) => state.persistentState.statuses
  );

  const movingCars = useSelector(
    (state: RootState) => state.persistentState.movingCars
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const trackLength = useTrackLength(trackRef);
  const { moveCar, setCarRef, stopCar, pauseCar, finisher, setFinisher } =
    useAnimateCar(trackLength, car.id);
  const { stopAnimation, startAnimation } = useAnimationLogic(
    car.id,
    moveCar,
    pauseCar,
    stopCar
  );
  const { handleDeleteCar } = useDeleteCar();

  useEffect(() => {
    if (finisher) {
      addFinisher({
        id: car.id,
        name: car.name,
        time: finisher,
        color: car.color,
      });
    }
  }, [finisher]);

  useEffect(() => {
    setCarRef(carRef.current);
  }, [setCarRef]);

  const resetCarBlock = useCallback(() => {
    setFinisher(undefined);
    stopCar();
    setReset(false);
  }, [setFinisher, setReset, stopCar]);

  useEffect(() => {
    if (startRace || movingCars[car.id]) {
      if (!carsStatuses[car.id]) {
        startAnimation(trackLength);
      }
    }
  }, [startRace]);

  useEffect(() => {
    if (reset) {
      resetCarBlock();
    }
  }, [reset]);

  const handleSelectCar = () => {
    dispatch(setSelectedCar(car));
    dispatch(setInputUpdate({ brand: car.name }));
    dispatch(setInputUpdate({ color: car.color }));
  };

  const handleStopCar = async () => {
    setFinisher(undefined);
    try {
      await startStopEngine(car.id, EngineStatus.Stopped);
      stopAnimation('stop');
      dispatch(setMovingCars({ id: car.id, isMoving: undefined }));
      dispatch(setStatuses({ id: car.id, status: undefined }));
      dispatch(setVelocity({ id: car.id, velocity: undefined }));
      dispatch(setDistance({ id: car.id, distance: undefined }));
      dispatch(setCarsPositions({ id: car.id, position: undefined }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="car-block">
      <div className="car-block__controls">
        <div className="car-block__btn-wrapper">
          <button type="button" className="small-btn" onClick={handleSelectCar}>
            Select
          </button>
          <button
            type="button"
            className="small-btn"
            onClick={() => {
              handleDeleteCar(car.id);
            }}
          >
            Remove
          </button>
          <h3>{car.name}</h3>
        </div>
        <div className="car-block__track-wrapper">
          <div className="car-block__btn-wrapper">
            <button
              type="button"
              className={
                movingCars[car.id] ? 'small-btn disabled' : 'small-btn'
              }
              onClick={() => {
                startAnimation(trackLength);
                dispatch(setMovingCars({ id: car.id, isMoving: true }));
              }}
              disabled={movingCars[car.id]}
            >
              A
            </button>
            <button
              type="button"
              className={
                !movingCars[car.id] ? 'small-btn disabled' : 'small-btn'
              }
              onClick={handleStopCar}
              disabled={!movingCars[car.id]}
            >
              B
            </button>
          </div>
          <div className="car-block__track" ref={trackRef}>
            <div ref={carRef}>
              <Car2Svg color={car.color} />
            </div>

            <div className="car-block__finish">
              <Finish />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
