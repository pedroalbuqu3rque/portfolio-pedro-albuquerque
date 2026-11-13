import type { SVGProps } from 'react';

type Direction = 'left' | 'right' | 'up-right' | 'down';

type Props = Omit<SVGProps<SVGSVGElement>, 'direction'> & {
  direction?: Direction;
  size?: number;
};

const PATHS: Record<Direction, string> = {
  left: 'M19 12H5m6-6-6 6 6 6',
  right: 'M5 12h14m-6-6 6 6-6 6',
  'up-right': 'M7 17 17 7M8 7h9v9',
  down: 'M12 5v14m-6-6 6 6 6-6',
};

export default function ArrowIcon({ direction = 'right', size = 20, className, ...props }: Props) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className ? `arrow-icon ${className}` : 'arrow-icon'}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={PATHS[direction]} />
    </svg>
  );
}
