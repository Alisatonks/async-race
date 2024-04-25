import { Car, CreatingCar } from '../types';
import HOST_API from './config-global';

async function createCar(car: CreatingCar): Promise<Car> {
  const response = await fetch(`${HOST_API}/garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const newCar = await response.json();
  return newCar;
}

export default createCar;
