import type { ReactNode } from 'react';
import Header from '../Header/Header';

type PageWrapperProps = {
  children: ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PageWrapper;


