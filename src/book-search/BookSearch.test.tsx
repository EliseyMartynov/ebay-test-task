// first time testing :))

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import BookSearch from './BookSearch';

const elements = () => {
  const { getByPlaceholderText, getByText, debug } = render(<BookSearch />);

  const input = getByPlaceholderText('Enter your bookname for ex: Javascript');
  const exampleBtn = getByText('"Javascript"');
  const exampleSpan = getByText('Try searching for a topic, for example');

  return { input, exampleSpan, exampleBtn, debug };
};

test('renders input with attributes', () => {
  const { input } = elements();

  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute('tabIndex', '1');
  expect(input).toHaveAttribute('type', 'search');
  expect(input).toHaveAttribute('name', 'gsearch');
});

test('renders example component when input is empty and vice verca', () => {
  const { input, exampleSpan } = elements();

  expect(exampleSpan).toBeInTheDocument();
  userEvent.type(input, 'something');
  expect(exampleSpan).not.toBeInTheDocument();
});

test('clicking test "Javascript" hides example component', () => {
  const { exampleBtn, exampleSpan } = elements();

  userEvent.click(exampleBtn);
  expect(exampleSpan).not.toBeInTheDocument();
});

//old version of CRA doesn't have type event in test library
//but new version reversing input type event
//so I'm just using old version like this was in base repo

test('input has correct value', () => {
  const { input } = elements();

  userEvent.type(input, 'testing case');
  expect(input).toHaveValue('testing case');
});
