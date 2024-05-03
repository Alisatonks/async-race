import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetWinnersQuery } from '../../../redux/slices/requestsApi';
import Pagination from '../../pagination/Pagination';
import TableRow from './TableRow';
import { SortBy, SortingOrder } from '../../../types';
import { RootState } from '../../../redux/store';
import ArrowDown from '../../svg/ArrowDown';
import ArrowUp from '../../svg/ArrowUp';
import {
  setSortingOrder,
  setSortingBy,
} from '../../../redux/slices/persistentStateReducer';

export default function Table() {
  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state: RootState) => state.persistentState.currentPageWinners
  );
  const sortBy = useSelector(
    (state: RootState) => state.persistentState.sortingBy
  );
  const order = useSelector(
    (state: RootState) => state.persistentState.sortingOrder
  );
  const { data, refetch } = useGetWinnersQuery({
    currentPage,
    order,
    sortBy,
  });

  const winners = data?.winData;
  const totalWinners = Number(data?.totalWin);

  useEffect(() => {
    refetch();
  }, [order, refetch]);

  const setSortOrder = () => {
    if (order === SortingOrder.asc) {
      dispatch(setSortingOrder(SortingOrder.decr));
    } else {
      dispatch(setSortingOrder(SortingOrder.asc));
    }
  };

  const sortByTime = () => {
    setSortOrder();
    dispatch(setSortingBy(SortBy.time));
  };

  const sortByWins = () => {
    setSortOrder();
    dispatch(setSortingBy(SortBy.wins));
  };

  return (
    <div className="winners-table-wrapper">
      <table className="winners-table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Car</th>
            <th>Name</th>
            <th onClick={sortByWins} className="sort">
              <div>
                Wins
                {order === SortingOrder.decr && sortBy === SortBy.wins && (
                  <ArrowDown />
                )}
                {order === SortingOrder.asc && sortBy === SortBy.wins && (
                  <ArrowUp />
                )}
              </div>
            </th>
            <th onClick={sortByTime} className="sort">
              <div>
                Best time (sec)
                {order === SortingOrder.decr && sortBy === SortBy.time && (
                  <ArrowDown />
                )}
                {order === SortingOrder.asc && sortBy === SortBy.time && (
                  <ArrowUp />
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {winners &&
            winners.map((winner, index) => (
              <TableRow
                index={index}
                winner={winner}
                key={winner.id}
                currentPage={currentPage}
              />
            ))}
        </tbody>
      </table>
      {winners && (
        <Pagination
          pageName="winners"
          numberOfCars={totalWinners}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
