/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react/macro';
import { HiExclamationCircle } from 'react-icons/hi';

const errorIconWrapperStyle = css`
  position: absolute;
  pointer-events: none;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 0.75rem;
`;

const ErrorIconWrapper = () => {
  const theme = useTheme();

  return (
    <div css={errorIconWrapperStyle}>
      <HiExclamationCircle
        css={css`
          font-size: 1.25rem;
          color: ${theme.palette.error.main};
        `}
      />
    </div>
  );
};

export default ErrorIconWrapper;
