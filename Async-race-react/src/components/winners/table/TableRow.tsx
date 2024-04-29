import { useEffect, useState } from 'react';
import { useGetAllCarsQuery } from '../../../redux/slices/requestsApi';
import Car2Svg from '../../car/car2Svg';
import { Winner } from '../../../types';

type Props = {
  index: number;
  winner: Winner;
};

export default function TableRow(props: Props) {
  const { index, winner } = props;

  const { data: cars } = useGetAllCarsQuery();

  const [color, setColor] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();

  useEffect(() => {
    if (winner && cars) {
      const car = cars.find((el) => el.id === winner.id);
      if (car) {
        setColor(car.color);
        setName(car.name);
      }
    }
  }, [cars, color, name, winner]);

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{color && <Car2Svg color={color} />}</td>
      <td>{name}</td>
      <td>{winner.wins}</td>
      <td>{winner.time}</td>
    </tr>
  );
}
