// first time testing :))

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import BookSearch from '.';

const defaultMock = () => {
  const { getByRole, getByText, findByText, getByPlaceholderText, debug } =
    render(<BookSearch />);

  const input = getByPlaceholderText('Enter your bookname for ex: Javascript');
  const exampleBtn = getByText('"Javascript"');
  const exampleSpan = getByText('Try searching for a topic, for example');

  return {
    getByRole,
    getByText,
    findByText,
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

  test('input edge case produces placeholder element', async () => {
    const { input, findByText } = defaultMock();

    // I don't know why it asks me to write act here
    // because react-testing-library wraps everything in act themself...
    // but may be it's older version.
    act(() => {
      userEvent.type(
        input,
        'Javjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj'
      );
    });

    const placeholder = await findByText('Books have not been founded');

    // we can just forget about console.error "cleanup after unmounting"
    // because I've red some comments that when we have some API calls in our useEffect
    // it's not even worth it to spend resourses for writing code for that.
    // https://habr.com/ru/post/493496/ (Russian)
    expect(placeholder).toBeInTheDocument();

    //anyways I've left that test here
  });
});
