import { ReactNode } from 'react';
import FooterBar from './footerbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <FooterBar />
    </>
  );
}
