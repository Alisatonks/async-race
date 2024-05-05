import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Alert from '../components/alert/Alert';
import { RootState } from '../redux/store';
import { setError } from '../redux/slices/errorReducer';

type Props = {
  children: ReactNode;
};

export default function DashboardLayout(props: Props) {
  const { children } = props;

  const error = useSelector((state: RootState) => state.error.error);

  const dispatch = useDispatch();

  const handleCloseAlert = () => {
    dispatch(setError(''));
  };

  return (
    <div className="wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
      {error && <Alert handleCloseAlert={handleCloseAlert} />}
    </div>
  );
}
