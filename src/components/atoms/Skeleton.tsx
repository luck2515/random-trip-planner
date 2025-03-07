import { FC } from 'react';

type SkeletonProps = {
  className?: string;
  height?: string;
  width?: string;
  rounded?: string;
};

export const Skeleton: FC<SkeletonProps> = ({
  className = '',
  height = 'h-4',
  width = 'w-full',
  rounded = 'rounded',
}) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${height} ${width} ${rounded} ${className}`}
    />
  );
};
