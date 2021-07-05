import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import sampleResponse from '../../sampleJSONResponse.json';
import BookSingle from './BookSingle';
import { allBooksMapping } from './index.service';

const mockData = allBooksMapping(JSON.parse(JSON.stringify(sampleResponse)));

const defaultMock = () => {
  const { getByText, getByRole, debug } = render(
    <BookSingle book={mockData[0]} />
  );

  const title = getByText(/JavaScript & jQuery: The Missing Manual/i);
  const infoBtn = getByRole('button', { name: '?' });
  const addToWishListhBtn = getByRole('button', { name: 'add to wishlist' });
  const image = getByRole('img');

  return {
    getByText,
    getByRole,
    title,
    infoBtn,
    addToWishListhBtn,
    image,
    debug,
  };
};

describe('BookSingle render tests', () => {
  test('renders book title & info btn & add btn & image', () => {
    const { title, infoBtn, addToWishListhBtn, image } = defaultMock();

    expect(title).toBeInTheDocument();
    expect(infoBtn).toBeInTheDocument();
    expect(addToWishListhBtn).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  test('renders placeholder if no image', () => {
    // made almost empty mock for placeholder/empty/etc. cases
    const { getByText } = render(<BookSingle book={mockData[1]} />);

    const noImageDiv = getByText('no image');

    expect(noImageDiv).toBeInTheDocument();
  });

  test("renders btn with 'Added' text when gets 'isBookInWishList' true prop", () => {
    const { getByRole } = render(
      <BookSingle book={mockData[0]} isBookInWishList />
    );

    const addedBtn = getByRole('button', { name: 'added' });

    expect(addedBtn).toBeInTheDocument();
  });

  test('renders remove btn when type is wish-list', () => {
    const { getByRole } = render(
      <BookSingle book={mockData[0]} type="wish-list" />
    );

    const removeBtn = getByRole('button', { name: 'remove' });

    expect(removeBtn).toBeInTheDocument();
  });
});

describe('BookSingle event tests', () => {
  test('renders title & author & publisher & published & description when info clicked and vice verca', () => {
    const { getByRole, getByText, infoBtn } = defaultMock();

    userEvent.click(infoBtn);

    const title = getByText(/JavaScript & jQuery: The Missing Manual/i); // new title but same text
    const closeBtn = getByRole('button', { name: '✕' });
    const author = getByText(/David Sawyer McFarland/i);
    const publisher = getByText(/O'Reilly Media, Inc+/i);
    const published = getByText(/2014-09-18/i);
    const description = getByText(
      /JavaScript lets you supercharge your HTML+/i
    );

    expect(infoBtn).not.toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(publisher).toBeInTheDocument();
    expect(published).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    userEvent.click(closeBtn);

    const titleRerender = getByText(/JavaScript & jQuery: The Missing Manual/i); // new title but same text
    const infoBtnRerender = getByRole('button', { name: '?' });

    expect(titleRerender).toBeInTheDocument();
    expect(infoBtnRerender).toBeInTheDocument();
    expect(closeBtn).not.toBeInTheDocument();
    expect(author).not.toBeInTheDocument();
    expect(publisher).not.toBeInTheDocument();
    expect(published).not.toBeInTheDocument();
    expect(description).not.toBeInTheDocument();
  });

  test("renders 'Author' when authors array length is 1", () => {
    const { getByText, infoBtn } = defaultMock();

    userEvent.click(infoBtn);

    const authorLabel = getByText(/Author:+/);

    expect(authorLabel).toBeInTheDocument();
  });

  test("renders 'Authors' when authors array is length is more than 1", () => {
    const { getByRole, getByText } = render(<BookSingle book={mockData[1]} />);

    const infoBtn = getByRole('button', { name: '?' });
    userEvent.click(infoBtn);

    const authorsLabel = getByText(/Authors:+/);

    expect(authorsLabel).toBeInTheDocument();
  });
});
