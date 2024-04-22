import { Cars } from '../types';
import HOST_API from './config-global';

async function getCars(_page?: number, _limit?: number) {
  const response = await fetch(
    `${HOST_API}/garage${_page || ''}${_limit || ''}`
  );
  const data: Cars = await response.json();
  return data;
}

export default getCars;
