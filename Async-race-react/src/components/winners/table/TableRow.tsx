import { useEffect, useState } from 'react';
import Car2Svg from '../../car/car2Svg';
import { Winner } from '../../../types';
import { getCar } from '../../../utils/api';

type Props = {
  index: number;
  winner: Winner;
  currentPage: number;
};

export default function TableRow(props: Props) {
  const { index, winner, currentPage } = props;

  const [color, setColor] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();

  useEffect(() => {
    const getCarById = async () => {
      const car = await getCar(winner.id);
      setColor(car.color);
      setName(car.name);
    };
    getCarById();
  }, [winner.id]);

  return (
    <tr>
      <td>{(currentPage - 1) * 10 + (index + 1)}</td>
      <td>{color && <Car2Svg color={color} />}</td>
      <td>{name}</td>
      <td>{winner.wins}</td>
      <td>{winner.time}</td>
    </tr>
  );
}
