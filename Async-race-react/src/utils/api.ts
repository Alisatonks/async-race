import HOST_API from './config-global';
import { Car, EngineStatus, VelocityDistance, Winner } from '../types';

export async function startStopEngine(
  id: number,
  status: EngineStatus
): Promise<VelocityDistance> {
  const response = await fetch(`${HOST_API}/engine?id=${id}&status=${status}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
  return res;
}

export async function startDriveMode(
  id: number,
  status: EngineStatus
): Promise<number> {
  const response = await fetch(`${HOST_API}/engine?id=${id}&status=${status}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res = response.status;
  return res;
}

export async function getWinner(id: number): Promise<Winner> {
  const response = await fetch(`${HOST_API}/winners/${id}`);
  const data = await response.json();
  return data;
}

export async function getCar(id: number): Promise<Car> {
  const response = await fetch(`${HOST_API}/garage/${id}`);
  const data = await response.json();
  return data;
}
