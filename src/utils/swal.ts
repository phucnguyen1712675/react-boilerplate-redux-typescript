import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const showLoadingSwal = () => {
  return MySwal.fire({
    title: 'Action in progress..',
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      MySwal.showLoading();
    },
  });
};

export const closeSwal = () => MySwal.close();

export const showSuccessSwal = ({
  text,
  title = 'Processing complete!',
  showConfirmButton = false,
}: {
  text?: string;
  title?: string;
  showConfirmButton?: boolean;
}) => {
  return MySwal.fire({
    title,
    icon: 'success',
    text,
    timer: 1000,
    showConfirmButton,
  });
};

export const showWarningSwal = (text: string) => {
  return MySwal.fire({
    title: 'Something wrong!',
    icon: 'warning',
    text,
  });
};

export const showErrorSwal = (text: string) => {
  return MySwal.fire({
    title: 'Failed!',
    icon: 'error',
    text,
  });
};

export const showConfirmSwal = () => {
  return Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });
};
