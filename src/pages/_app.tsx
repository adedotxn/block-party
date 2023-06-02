import Layout from '@/components/ui/layout';
import '@/styles/globals.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
const theme = extendTheme({
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

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
