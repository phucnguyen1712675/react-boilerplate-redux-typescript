import { Selector } from '@reduxjs/toolkit';
import { RequestStatus } from 'enums';
import { useAppSelector } from 'hooks';
import { useEffect } from 'react';
import { RootState } from 'store';
import { showErrorSwal } from 'utils/swal';
import type { IRequestInfo } from 'interfaces';

type Props = Selector<RootState, IRequestInfo>;

const useRequestInfoWithErrorSwal = (selector: Props) => {
  const { status, error } = useAppSelector(selector);

  useEffect(() => {
    const operationFailed = status === RequestStatus.FAILED && error;

    if (operationFailed) {
      showErrorSwal(error || 'Something went wrong');
    }
  }, [status, error]);

  const loading = status === RequestStatus.LOADING;

  const result = {
    status,
    error,
    loading,
  };

  return result;
};

export default useRequestInfoWithErrorSwal;
