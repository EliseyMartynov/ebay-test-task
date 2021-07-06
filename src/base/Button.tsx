import React, { MouseEventHandler } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?:
    | 'primary'
    | 'secondary'
    | 'transparent'
    | 'disabled'
    | 'remove'
    | 'close'
    | 'info';
  onClick?: (() => void) | MouseEventHandler<HTMLElement>;
}

const Button = ({
  children,
  className,
  type = 'primary',
  onClick,
}: ButtonProps) => {
  const classMerged = `${styles.primary} ${styles[type]} ${className}`;

  return (
    <button
      disabled={type === 'disabled'}
      className={classMerged}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
