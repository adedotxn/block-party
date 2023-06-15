import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { samsungSans } from './fonts';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster
        richColors
        position="top-center"
        toastOptions={{ style: { fontSize: '1rem', fontWeight: 700 } }}
      />
      <main className={samsungSans.className}>{children}</main>
      {/* <FooterBar /> */}
    </>
  );
}
