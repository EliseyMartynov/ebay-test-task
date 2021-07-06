import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Button from './Button';

describe('Base Button render tests', () => {
  test('renders button with children', () => {
    const { getByRole } = render(<Button>test</Button>);

    expect(getByRole('button')).toHaveTextContent('test');
  });

  test('renders button without disabled prop if type is not "disabled"', () => {
    const { getByRole } = render(<Button type="secondary">test</Button>);

    expect(getByRole('button')).not.toHaveAttribute('disabled', '');
  });

  test('renders button with disabled prop when type is disabled', () => {
    const { getByRole, debug } = render(<Button type="disabled">test</Button>);

    expect(getByRole('button')).toHaveAttribute('disabled', '');
  });
});

describe('Base Button event tests', () => {
  test('default button onClick works properly', () => {
    const click = jest.fn();
    const { getByRole } = render(<Button onClick={click}>test</Button>);

    userEvent.click(getByRole('button'));

    expect(click).toHaveBeenCalledTimes(1);
  });

  test('disabled button is not clickable', () => {
    const click = jest.fn();
    const { getByRole } = render(
      <Button type="disabled" onClick={click}>
        test
      </Button>
    );

    userEvent.click(getByRole('button'));

    expect(click).toHaveBeenCalledTimes(0);
  });

  test('button is focusable', () => {
    const { getByRole } = render(<Button>test</Button>);
    const btn = getByRole('button');

    btn.focus();

    expect(btn).toHaveFocus();
  });
});
