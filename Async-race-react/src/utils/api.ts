import { Cars, Car, CreatingCar } from '../types';
import HOST_API from './config-global';

export async function getCars(_page?: number, _limit?: number): Promise<Cars> {
  const response = await fetch(
    `${HOST_API}/garage${_page || ''}${_limit || ''}`
  );
  const data: Cars = await response.json();
  return data;
}

export async function createCar(car: CreatingCar): Promise<Car> {
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
