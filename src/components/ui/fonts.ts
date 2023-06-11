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
