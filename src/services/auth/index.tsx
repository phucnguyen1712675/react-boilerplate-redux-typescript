import { ReactNode } from 'react';

import { createCtx } from 'helpers';
import { useLocalStorage } from 'usehooks-ts';
import type { SetValue } from 'types';

const [useAuthState, AuthStateProvider] = createCtx<boolean>();
const [useAuthUpdater, AuthUpdaterProvider] = createCtx<SetValue<boolean>>();

const useAuth = () => [useAuthState(), useAuthUpdater()];

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useLocalStorage(
    'authenticated',
    false
  );

  return (
    <AuthStateProvider value={authenticated}>
      <AuthUpdaterProvider value={setAuthenticated}>
        {children}
      </AuthUpdaterProvider>
    </AuthStateProvider>
  );
};

export { useAuthState, useAuthUpdater, useAuth, AuthProvider };
