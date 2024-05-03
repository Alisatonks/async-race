import { ReactNode } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

type Props = {
  children: ReactNode;
};

export default function DashboardLayout(props: Props) {
  const { children } = props;

  return (
    <div className="wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
