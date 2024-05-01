import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetWinnersQuery } from '../../../redux/slices/requestsApi';
import Pagination from '../../pagination/Pagination';
import TableRow from './TableRow';
import { SortBy, SortingOrder } from '../../../types';
import { RootState } from '../../../redux/store';
import ArrowDown from '../../svg/ArrowDown';
import ArrowUp from '../../svg/ArrowUp';

export default function Table() {
  const [sortBy, setSortBy] = useState<SortBy | undefined>(undefined);
  const [order, setOrder] = useState<SortingOrder | undefined>(undefined);
  const currentPage = useSelector(
    (state: RootState) => state.persistentState.currentPageWinners
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

  const setSortingOrder = () => {
    if (order === SortingOrder.asc) {
      setOrder(SortingOrder.decr);
    } else {
      setOrder(SortingOrder.asc);
    }
  };

  const sortByTime = () => {
    setSortingOrder();
    setSortBy(SortBy.time);
  };

  const sortByWins = () => {
    setSortingOrder();
    setSortBy(SortBy.wins);
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
                {order === SortingOrder.decr && <ArrowDown />}
                {order === SortingOrder.asc && <ArrowUp />}
              </div>
            </th>
            <th onClick={sortByTime} className="sort">
              <div>
                Best time (sec)
                {order === SortingOrder.decr && <ArrowDown />}
                {order === SortingOrder.asc && <ArrowUp />}
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
