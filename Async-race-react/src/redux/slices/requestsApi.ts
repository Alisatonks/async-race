import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import HOST_API from '../../utils/config-global';
import { Cars, CreatingCar, Car, Winner } from '../../types';

export const requestsApi = createApi({
  reducerPath: 'requestsApi',
  baseQuery: fetchBaseQuery({ baseUrl: HOST_API }),
  tagTypes: ['Car', 'Winners'],
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
    getWinners: builder.query<Winner[], void>({
      query: () => 'winners',
      providesTags: ['Winners'],
    }),
    addWinner: builder.mutation<Winner, Winner>({
      query: (winner) => ({
        url: '/winners',
        method: 'POST',
        body: winner,
      }),
      invalidatesTags: ['Winners'],
    }),
    updateWinner: builder.mutation<Winner, Winner>({
      query: ({ id, ...rest }) => ({
        url: `/winners/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Winners'],
    }),
    deleteWinner: builder.mutation<void, number>({
      query: (id) => ({
        url: `/winners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Winners'],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useAddCarMutation,
  useDeleteCarMutation,
  useUpdateCarMutation,
  useGetWinnersQuery,
  useAddWinnerMutation,
  useUpdateWinnerMutation,
  useDeleteWinnerMutation,
} = requestsApi;
