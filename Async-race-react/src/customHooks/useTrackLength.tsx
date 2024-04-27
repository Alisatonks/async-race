import { useEffect, useState, RefObject } from 'react';

const useTrackLength = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [trackLength, setTrackLength] = useState<number | undefined>(
    ref.current ? ref.current.offsetWidth : undefined
  );

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setTrackLength(ref.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);

  return trackLength;
};

export default useTrackLength;
