import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import HOST_API from '../../utils/config-global';
import { Cars, CreatingCar, Car } from '../../types';

export const carsApi = createApi({
  reducerPath: 'carsApi',
  baseQuery: fetchBaseQuery({ baseUrl: HOST_API }),
  tagTypes: ['Car'],
  endpoints: (builder) => ({
    getAllCars: builder.query<Cars, void>({
      query: () => 'garage',
      providesTags: ['Car'],
    }),
    addCar: builder.mutation<Car, CreatingCar>({
      query: (car) => ({
        url: '/garage',
        method: 'POST',
        body: car,
      }),
      invalidatesTags: ['Car'],
    }),
    deleteCar: builder.mutation<void, number>({
      query: (id) => ({
        url: `/garage/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Car'],
    }),
    updateCar: builder.mutation<Car, Car>({
      query: ({ id, ...rest }) => ({
        url: `/garage/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Car'],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useAddCarMutation,
  useDeleteCarMutation,
  useUpdateCarMutation,
} = carsApi;
