import { LoadingIndicator } from 'app/components';
import { LoadingWrapper } from 'app/components/styled';
import { RequestStatus } from 'enums';
import { createCtx } from 'helpers';
import { useAppDispatch, useAppSelector } from 'hooks';
import { ReactNode, useEffect, useState } from 'react';
import { fetchUsers, selectFetchUsersInfo } from 'store/users/usersSlice';
import type { SetValue } from 'types';

const [useAppLoadingState, AppLoadingStateProvider] = createCtx<boolean>();
const [useAppLoadingUpdater, AppLoadingUpdaterProvider] =
  createCtx<SetValue<boolean>>();

export { useAppLoadingState, useAppLoadingUpdater };

export const useAppLoading = () => {
  return [useAppLoadingState(), useAppLoadingUpdater()] as const;
};

type Props = {
  children: ReactNode;
};

export const AppLoadingProvider = ({ children }: Props) => {
  const { status } = useAppSelector(selectFetchUsersInfo);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === RequestStatus.IDLE) {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if ([!RequestStatus.IDLE, RequestStatus.LOADING].includes(status)) {
      setLoading(false);
    }
  }, [status]);

  return (
    <AppLoadingStateProvider value={loading}>
      <AppLoadingUpdaterProvider value={setLoading}>
        {loading ? (
          <LoadingWrapper>
            <LoadingIndicator />
          </LoadingWrapper>
        ) : (
          children
        )}
      </AppLoadingUpdaterProvider>
    </AppLoadingStateProvider>
  );
};
