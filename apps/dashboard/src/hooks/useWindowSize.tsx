import { useState, useEffect, useMemo } from 'react';

interface IWindowSize {
  width: number;
  height: number;
  scale: number;
  offset_left: number;
  offset_top: number;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: 0,
    height: 0,
    scale: 1,
    offset_left: 0,
    offset_top: 0,
  });

  useEffect(() => {
    const handler = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        scale: window.innerWidth / 1920,
        offset_left: (1920 - window.innerWidth) / 2,
        offset_top: 60 * (1 - window.innerWidth / 1920),
      });
    };

    handler();

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);
  return [windowSize];
};

export default useWindowSize;
