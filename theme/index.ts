import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      html: {
        minWidth: '360px',
        scrollBehavior: 'smooth',
      },
    },
  },
});
