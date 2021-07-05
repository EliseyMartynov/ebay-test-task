import { render } from '@testing-library/react';
import React from 'react';
import BooksWrapper from './BooksWrapper';

const defaultMock = () => {
  const { getAllByText } = render(
    <BooksWrapper
      skeletonCount={10}
      isLoading
      skeletonElement={(i) => <div key={i}>just test</div>}
    />
  );

  return {
    getAllByText,
  };
};

describe('BooksWrapper render tests', () => {
  test('renders skeletons with proper quantity', () => {
    const { getAllByText } = defaultMock();

    expect(getAllByText('just test')).toHaveLength(10);
  });

  test('renders children when isLoading false', () => {
    const { getByText } = render(
      <BooksWrapper
        skeletonCount={10}
        isLoading={false}
        skeletonElement={(i) => <div key={i}>just test</div>}
      >
        children
      </BooksWrapper>
    );

    expect(getByText('children')).toBeInTheDocument();
  });
});
