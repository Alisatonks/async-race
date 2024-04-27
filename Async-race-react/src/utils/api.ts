import HOST_API from './config-global';
import { EngineStatus, VelocityDistance } from '../types';

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
