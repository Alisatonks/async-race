import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function BoxWithInput(props: Props) {
  const { children } = props;
  return (
    <div className="controls__group">
      <input className="brand-input" type="text" placeholder="Car brand" />
      <input type="color" />
      {children}
    </div>
  );
}
