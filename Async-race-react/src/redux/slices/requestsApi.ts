import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import HOST_API from '../../utils/config-global';
import { Cars, CreatingCar, Car, Winner, Params, TotCars } from '../../types';
import { CARS_PER_PAGE, WINNERS_PER_PAGE } from '../../utils/constants';

export const requestsApi = createApi({
  reducerPath: 'requestsApi',
  baseQuery: fetchBaseQuery({ baseUrl: HOST_API }),
  tagTypes: ['Car', 'Winners'],
  endpoints: (builder) => ({
    getAllCars: builder.query<{ carsData: Cars; totalCars: TotCars }, number>({
      query: (currentPage) =>
        `garage?_page=${currentPage}&_limit=${CARS_PER_PAGE}`,
      transformResponse: (response, meta) => {
        const totalCars = meta?.response?.headers.get('X-Total-Count');
        const carsData: Cars = response as Cars;
        return { carsData, totalCars };
      },
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
    getWinners: builder.query<{ winData: Winner[]; totalWin: TotCars }, Params>(
      {
        query: (params) =>
          `winners?_page=${params?.currentPage}&_limit=${WINNERS_PER_PAGE}&_sort=${params?.sortBy}&_order=${params?.order}`,
        transformResponse: (response, meta) => {
          const totalWin = meta?.response?.headers.get('X-Total-Count');
          const winData: Winner[] = response as Winner[];
          return { winData, totalWin };
        },
        providesTags: ['Winners'],
      }
    ),
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
