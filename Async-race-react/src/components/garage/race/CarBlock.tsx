import { Car } from '../../../types';
import Car2Svg from '../../car/car2Svg';
import Finish from '../../svg/Finish';

type Props = {
  car: Car;
};

export default function CarBlock(props: Props) {
  const { car } = props;

  return (
    <div className="car-block">
      <div className="car-block__controls">
        <div className="car-block__btn-wrapper">
          <button type="button" className="small-btn">
            Select
          </button>
          <button type="button" className="small-btn">
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
