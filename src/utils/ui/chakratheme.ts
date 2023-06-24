import { extendTheme } from '@chakra-ui/react';
import localFont from 'next/font/local';

export const productSans = localFont({
  src: [
    {
      path: '../../../public/fonts/Product Sans Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Product Sans Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/Product Sans Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Product Sans Bold Italic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
});

export const samsungSans = localFont({
  src: [
    {
      path: '../../../public/fonts/samsungsharpsans.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/samsungsharpsans-medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/samsungsharpsans-bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const theme = extendTheme({
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
      event: '#E8E8E8',
      calender: '#F2F2F2',
      tab: '#D9D9D9',
    },
    btn: {
      yellow: '#FCA311',
    },
  },

  breakpoints: {
    md: '534px', //subject to change
  },
});
