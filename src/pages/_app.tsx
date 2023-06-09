import Layout from '@/components/ui/layout';
import '@/styles/globals.css';
import { theme } from '@/utils/ui/chakratheme';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

function App({ Component, pageProps, ...appProps }: AppProps) {
  const pathname = appProps.router.pathname;

  if (
    pathname.includes('invite') ||
    pathname === 'invite' ||
    pathname === '/'
  ) {
    return (
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    );
  }
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
