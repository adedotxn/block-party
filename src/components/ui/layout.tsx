import { ReactNode } from 'react';
import { samsungSans } from './fonts';
import FooterBar from './footerbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className={samsungSans.className}>{children}</main>
      <FooterBar />
    </>
  );
}
