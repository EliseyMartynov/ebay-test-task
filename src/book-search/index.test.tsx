// first time testing :))

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import BookSearch from '.';

const defaultMock = () => {
  const { getByRole, getByPlaceholderText, getByText, debug } = render(
    <BookSearch />
  );

  const input = getByPlaceholderText('Enter your bookname for ex: Javascript');
  const exampleBtn = getByText('"Javascript"');
  const exampleSpan = getByText('Try searching for a topic, for example');

  return {
    getByRole,
    input,
    exampleSpan,
    exampleBtn,
    debug,
  };
};

describe('BookSearch render tests', () => {
  test('renders input with attributes', () => {
    const { input } = defaultMock();

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('tabIndex', '1');
    expect(input).toHaveAttribute('type', 'search');
    expect(input).toHaveAttribute('name', 'gsearch');
  });

  test('renders example component when input is empty', () => {
    const { exampleSpan } = defaultMock();

    expect(exampleSpan).toBeInTheDocument();
  });
});

describe('BookSearch event tests', () => {
  test('clicking test "Javascript" hides example component', () => {
    const { exampleBtn, exampleSpan } = defaultMock();

    userEvent.click(exampleBtn);
    expect(exampleSpan).not.toBeInTheDocument();
  });

  test('input has correct value', () => {
    const { input } = defaultMock();

    userEvent.type(input, 'testing case');
    expect(input).toHaveValue('testing case');
  });

  test('hides example component when user inputs something', () => {
    const { input, exampleSpan } = defaultMock();

    userEvent.type(input, 'something');
    expect(exampleSpan).not.toBeInTheDocument();
  });

  test('check if input is focusable', () => {
    const { input } = defaultMock();

    input.focus();

    expect(input).toHaveFocus();
  });
});
