import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetWinnersQuery } from '../../../redux/slices/requestsApi';
import Pagination from '../../pagination/Pagination';
import TableRow from './TableRow';
import { WINNERS_PER_PAGE } from '../../../utils/constants';
import { SortBy, SortingOrder } from '../../../types';
import { RootState } from '../../../redux/store';

export default function Table() {
  const [sortBy, setSortBy] = useState<SortBy | undefined>(undefined);
  const [order, setOrder] = useState<SortingOrder | undefined>(undefined);
  const { data: winners, refetch } = useGetWinnersQuery({
    order,
    sortBy,
  });

  const currentPage = useSelector(
    (state: RootState) => state.persistentState.currentPageWinners
  );
  const lastIndex = WINNERS_PER_PAGE * currentPage;
  const firstIndex = lastIndex - WINNERS_PER_PAGE;
  const winnersOnPage = winners ? winners.slice(firstIndex, lastIndex) : [];

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
              Wins
            </th>
            <th onClick={sortByTime} className="sort">
              Best time
            </th>
          </tr>
        </thead>
        <tbody>
          {winners &&
            winnersOnPage.map((winner, index) => (
              <TableRow index={index} winner={winner} key={winner.id} />
            ))}
        </tbody>
      </table>
      {winners && (
        <Pagination
          pageName="winners"
          numberOfCars={winners.length}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
