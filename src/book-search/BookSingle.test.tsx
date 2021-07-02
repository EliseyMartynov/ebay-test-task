import { render } from '@testing-library/react';
import React from 'react';
import sampleResponse from '../../sampleJSONResponse.json';
import { allBooksMapping } from './BookSearch.service';
import BookSingle from './BookSingle';

const mockData = allBooksMapping(JSON.parse(JSON.stringify(sampleResponse)));

const elements = () => {
  const { getByText, debug } = render(<BookSingle book={mockData[0]} />);

  const title = getByText('JavaScript & jQuery: The Missing Manual');

  return { title, debug };
};

it('renders book title', () => {
  const { title } = elements();

  expect(title).toBeInTheDocument();
});
