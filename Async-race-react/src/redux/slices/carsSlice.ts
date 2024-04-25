import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import HOST_API from '../../utils/config-global';
import { Cars } from '../../types';

export const carsApi = createApi({
  reducerPath: 'carsApi',
  baseQuery: fetchBaseQuery({ baseUrl: HOST_API }),
  endpoints: (builder) => ({
    getAllCars: builder.query<Cars, void>({
      query: () => 'garageg',
    }),
  }),
});

export const { useGetAllCarsQuery } = carsApi;
