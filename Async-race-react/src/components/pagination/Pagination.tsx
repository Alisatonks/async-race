import { useDispatch } from 'react-redux';
import { CARS_PER_PAGE, WINNERS_PER_PAGE } from '../../utils/constants';
import Back from '../svg/Back';
import Forward from '../svg/Forward';
import {
  setCurrentPageGarage,
  setCurrentPageWinners,
} from '../../redux/slices/persistentStateReducer';

type Props = {
  pageName: string;
  numberOfCars: number;
  currentPage: number;
  handleReset?: () => void;
};

export default function Pagination(props: Props) {
  const { pageName, numberOfCars, currentPage, handleReset } = props;

  const dispatch = useDispatch();

  const firstPage = currentPage === 1;
  const totalPages = Math.ceil(
    numberOfCars / (pageName === 'garage' ? CARS_PER_PAGE : WINNERS_PER_PAGE)
  );
  const lastPage = currentPage === totalPages;

  if (totalPages < currentPage) {
    if (handleReset) {
      handleReset();
    }
    if (pageName === 'garage') {
      dispatch(setCurrentPageGarage(currentPage - 1));
    } else if (pageName === 'winners') {
      dispatch(setCurrentPageWinners(currentPage - 1));
    }
  }

  const iconColors = [
    firstPage ? 'rgba(255, 255, 255, 0.273)' : '#9B7EDA',
    lastPage ? 'rgba(255, 255, 255, 0.273)' : '#9B7EDA',
  ];

  const handleForward = () => {
    if (handleReset) {
      handleReset();
    }
    if (pageName === 'garage') {
      dispatch(setCurrentPageGarage(currentPage + 1));
    } else if (pageName === 'winners') {
      dispatch(setCurrentPageWinners(currentPage + 1));
    }
  };

  const handleBack = () => {
    if (handleReset) {
      handleReset();
    }
    if (pageName === 'garage') {
      dispatch(setCurrentPageGarage(currentPage - 1));
    } else if (pageName === 'winners') {
      dispatch(setCurrentPageWinners(currentPage - 1));
    }
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

Pagination.defaultProps = {
  handleReset: undefined,
};
