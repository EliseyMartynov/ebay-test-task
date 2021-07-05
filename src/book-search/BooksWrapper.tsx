import React, { ReactElement } from 'react';
import styles from './styles.module.scss';

interface BooksAllProps {
  children?: React.ReactNode;
  skeletonCount: number;
  skeletonElement: (key: number) => ReactElement<any>;
  isLoading: Boolean;
}

const BooksWrapper = ({
  children,
  skeletonCount,
  skeletonElement,
  isLoading,
}: BooksAllProps) => {
  const skeletonFill = Array(skeletonCount).fill('skeleton');

  return (
    <div className={styles.booksWrapper}>
      {isLoading ? skeletonFill.map((item, i) => skeletonElement(i)) : children}
    </div>
  );
};

export default BooksWrapper;
