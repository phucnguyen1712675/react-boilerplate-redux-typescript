import { useRef, useEffect } from 'react';

const useMounted = () => {
  const mounted = useRef(true);

  useEffect(() => {
    // mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return mounted;
};

export default useMounted;
