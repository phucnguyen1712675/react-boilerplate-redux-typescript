import { useLocation } from 'react-router-dom';
import type { LocationState } from 'types';

const usePathname = () => {
  const location = useLocation();
  const locationState = location.state as LocationState | undefined;
  const pathname = locationState?.from?.pathname;
  return pathname;
};

export default usePathname;
