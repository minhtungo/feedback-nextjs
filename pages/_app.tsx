import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/lib/auth';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/theme/index';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <AuthProvider>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
