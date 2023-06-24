import { samsungSans } from '@/utils/ui/chakratheme';
import Head from 'next/head';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>The Block Party</title>
        <meta
          name="description"
          content="Making an impact. Building Connections"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Toaster
        richColors
        position="top-center"
        toastOptions={{ style: { fontSize: '1rem', fontWeight: 700 } }}
      />
      <main className={samsungSans.className}>{children}</main>
    </>
  );
}
