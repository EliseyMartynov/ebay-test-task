import React from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  const classMerged = `${styles.base} ${className}`;

  return <div className={classMerged} />;
};

export default Skeleton;
