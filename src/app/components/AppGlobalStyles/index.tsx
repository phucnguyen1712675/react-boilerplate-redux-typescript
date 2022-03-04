import { Global, useTheme } from '@emotion/react/macro';
import { globalStyles } from 'styles';

const AppGlobalStyles = () => {
  const theme = useTheme();
  const appGlobalStyles = globalStyles(theme);
  return <Global styles={appGlobalStyles} />;
};

export default AppGlobalStyles;
