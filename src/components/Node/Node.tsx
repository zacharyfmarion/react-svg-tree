import * as React from 'react';

export interface Props {
  id: number;
  childNodes?: Array<number>;
  // depth in the tree
  depth: number;
  className?: string;
  x?: number;
  y?: number;
}

const Node = ({ id, x, y, className }: Props) => (
  <circle cx={x} cy={y} r="4" className={className} />
);

export default Node;
