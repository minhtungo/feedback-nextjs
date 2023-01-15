import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/lib/auth';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/theme/index';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
