/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Car, EngineStatus, Finisher } from '../../../types';
import Car2Svg from '../../car/car2Svg';
import Finish from '../../svg/Finish';
import { setSelectedCar } from '../../../redux/slices/selectedCarReducer';
import useAnimateCar from '../../../customHooks/useAnimateCar';
import useTrackLength from '../../../customHooks/useTrackLength';
import useAnimationLogic from '../../../customHooks/useAnimationLogic';
import { setInputUpdate } from '../../../redux/slices/persistentStateReducer';
import { startStopEngine } from '../../../utils/api';
import useDeleteCar from '../../../customHooks/useDeleteCar';

type Props = {
  car: Car;
  startRace: boolean;
  reset: boolean;
  setReset: (reset: boolean) => void;
  addFinisher: (finisher: Finisher) => void;
  setStartRace: (startRace: boolean) => void;
  stopEngines: boolean;
  setStopEngines: (stopEngines: boolean) => void;
};

export default function CarBlock(props: Props) {
  const {
    car,
    startRace,
    reset,
    setReset,
    addFinisher,
    setStartRace,
    stopEngines,
    setStopEngines,
  } = props;

  const [isMoving, setIsMoving] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);

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
    setStartRace(false);
    const stopEngine = async () => {
      const handleReset = () => {
        stopCar();
        setReset(false);
        setIsMoving(false);
        setStopEngines(false);
      };
      if (stopEngines) {
        try {
          await startStopEngine(car.id, EngineStatus.Stopped);
          handleReset();
        } catch (e) {
          console.log(e);
        }
      } else {
        handleReset();
      }
    };

    stopEngine();
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

  const handleSelectCar = () => {
    dispatch(setSelectedCar(car));
    dispatch(setInputUpdate({ brand: car.name }));
    dispatch(setInputUpdate({ color: car.color }));
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
