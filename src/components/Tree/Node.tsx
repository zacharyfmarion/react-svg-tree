import * as React from 'react';

export interface Props {
  id: number;
  childNodes?: Array<number>;
  // depth in the tree
  depth: number;
  rowIndex: number;
  className?: string;
  x?: number;
  y?: number;
}

const Node = ({ id, x, y, className }: Props) => (
  <circle cx={x} cy={y} r="2" className={className} />
);

export default Node;
