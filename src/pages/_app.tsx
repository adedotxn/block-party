import { productSans, samsungSans } from '@/components/ui/fonts';
import Layout from '@/components/ui/layout';
import '@/styles/globals.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

const queryClient = new QueryClient();
const theme = extendTheme({
  fonts: {
    samsungSharpSans: samsungSans.style.fontFamily,
    productSans: productSans.style.fontFamily,
  },
  colors: {
    red: {
      1: '#FF1C1C',
      2: '#D50000',
      3: '#D40000',
    },
    blue: {
      1: '#0076A9',
    },
    grey: {
      1: '#626262',
    },
  },

  breakpoints: {
    md: '534px', //subject to change
  },
});

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
