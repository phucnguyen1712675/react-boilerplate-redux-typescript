/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const color = 'darkgreen';

const App = () => {
  return (
    <div
      css={css`
        background-color: hotpink;
        &:hover {
          color: ${color};
        }
      `}
    >
      This has a hotpink background.
    </div>
  );
};

export default App;
