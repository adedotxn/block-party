import { ReactNode } from 'react';
import { samsungSans } from './fonts';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className={samsungSans.className}>{children}</main>
      {/* <FooterBar /> */}
    </>
  );
}
