/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Car, Finisher } from '../../../types';
import Car2Svg from '../../car/car2Svg';
import Finish from '../../svg/Finish';
import {
  useDeleteCarMutation,
  useDeleteWinnerMutation,
} from '../../../redux/slices/requestsApi';
import { setSelectedCar } from '../../../redux/slices/selectedCarReducer';
import { RootState } from '../../../redux/store';
import useAnimateCar from '../../../customHooks/useAnimateCar';
import useTrackLength from '../../../customHooks/useTrackLength';
import useAnimationLogic from '../../../customHooks/useAnimationLogic';

type Props = {
  car: Car;
  startRace: boolean;
  reset: boolean;
  setReset: (reset: boolean) => void;
  addFinisher: (finisher: Finisher) => void;
};

export default function CarBlock(props: Props) {
  const { car, startRace, reset, setReset, addFinisher } = props;

  const [isMoving, setIsMoving] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);

  const [deleteCar] = useDeleteCarMutation();
  const dispatch = useDispatch();
  const trackLength = useTrackLength(trackRef);
  const { moveCar, setCarRef, stopCar, pauseCar, finisher, setFinisher } =
    useAnimateCar(trackLength);
  const { stopAnimation, startAnimation } = useAnimationLogic(
    car.id,
    moveCar,
    pauseCar,
    stopCar,
    setIsMoving
  );

  const selectedCar = useSelector(
    (state: RootState) => state.selectedCar.selectedCar
  );

  const [deleteWinner] = useDeleteWinnerMutation();

  useEffect(() => {
    if (finisher) {
      addFinisher({ id: car.id, name: car.name, time: finisher });
    }
  }, [finisher]);

  useEffect(() => {
    setCarRef(carRef.current);
  }, [setCarRef]);

  const resetCarBlock = useCallback(() => {
    stopCar();
    setReset(false);
    setIsMoving(false);
    setFinisher(undefined);
  }, [setFinisher, setReset, stopCar]);

  useEffect(() => {
    if (startRace) {
      startAnimation();
    }
  }, [startRace]);

  useEffect(() => {
    if (reset) {
      resetCarBlock();
    }
  }, [resetCarBlock, reset]);

  const handleDelete = async () => {
    if (car.id === selectedCar?.id) {
      dispatch(setSelectedCar(null));
    }
    await deleteCar(car.id);
    deleteWinner(car.id);
  };

  const handleSelectCar = () => {
    dispatch(setSelectedCar(car));
  };

  return (
    <div className="car-block">
      <div className="car-block__controls">
        <div className="car-block__btn-wrapper">
          <button type="button" className="small-btn" onClick={handleSelectCar}>
            Select
          </button>
          <button type="button" className="small-btn" onClick={handleDelete}>
            Remove
          </button>
          <h3>{car.name}</h3>
        </div>
        <div className="car-block__track-wrapper">
          <div className="car-block__btn-wrapper">
            <button
              type="button"
              className={isMoving ? 'small-btn disabled' : 'small-btn'}
              onClick={startAnimation}
              disabled={isMoving}
            >
              A
            </button>
            <button
              type="button"
              className={!isMoving ? 'small-btn disabled' : 'small-btn'}
              onClick={() => {
                stopAnimation('stop');
                setFinisher(undefined);
              }}
              disabled={!isMoving}
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
