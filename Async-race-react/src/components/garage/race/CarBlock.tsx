import { useDispatch, useSelector } from 'react-redux';
import { Car } from '../../../types';
import Car2Svg from '../../car/car2Svg';
import Finish from '../../svg/Finish';
import { useDeleteCarMutation } from '../../../redux/slices/carsSlice';
import { setSelectedCar } from '../../../redux/slices/selectedCarReducer';
import { RootState } from '../../../redux/store';

type Props = {
  car: Car;
};

export default function CarBlock(props: Props) {
  const { car } = props;

  const [deleteCar] = useDeleteCarMutation();

  const dispatch = useDispatch();

  const selectedCar = useSelector(
    (state: RootState) => state.selectedCar.selectedCar
  );

  const handleDelete = async () => {
    if (car.id === selectedCar?.id) {
      dispatch(setSelectedCar(null));
    }
    await deleteCar(car.id);
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
            <button type="button" className="small-btn">
              A
            </button>
            <button type="button" className="small-btn">
              B
            </button>
          </div>
          <div className="car-block__track">
            <Car2Svg color={car.color} />
            <div className="car-block__finish">
              <Finish />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
