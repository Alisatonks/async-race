import { CARS_PER_PAGE } from '../../utils/constants';
import Back from '../svg/Back';
import Forward from '../svg/Forward';

type Props = {
  pageName: string;
  numberOfCars: number;
  currentPage: number;
  setPage: (page: number) => void;
};

export default function Pagination(props: Props) {
  const { pageName, numberOfCars, currentPage, setPage } = props;

  const firstPage = currentPage === 1;
  const totalPages = Math.ceil(numberOfCars / CARS_PER_PAGE);
  const lastPage = currentPage === totalPages;

  if (totalPages < currentPage) {
    setPage(currentPage - 1);
  }

  const iconColors = [
    firstPage ? 'rgba(255, 255, 255, 0.273)' : '#9B7EDA',
    lastPage ? 'rgba(255, 255, 255, 0.273)' : '#9B7EDA',
  ];

  const handleForward = () => {
    setPage(currentPage + 1);
  };

  const handleBack = () => {
    setPage(currentPage - 1);
  };

  return (
    <div className="pagination">
      <h5>{`${pageName} (${numberOfCars})`}</h5>
      <div className="current-page-wrapper">
        <button type="button" disabled={firstPage} onClick={handleBack}>
          <Back color={iconColors[0]} />
        </button>
        <h5>{`page #${currentPage}`}</h5>
        <button type="button" disabled={lastPage} onClick={handleForward}>
          <Forward color={iconColors[1]} />
        </button>
      </div>
    </div>
  );
}
