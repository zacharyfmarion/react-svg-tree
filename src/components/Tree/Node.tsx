import * as React from 'react';
import withDefaultProps from '../../helpers/withDefaultProps';

export type NodeElement = React.ReactElement<Props>;

export interface Props {
  id: number;
  childNodes?: Array<number>;
  // depth in the tree
  depth: number;
  rowIndex: number;
  className?: string;
  r?: number;
  cx?: number;
  cy?: number;
}

const NodeComponent: React.SFC<Props> = ({
  cx,
  cy,
  id,
  r,
  className,
}: Props) => <circle cx={cx} cy={cy} r={r} className={className} />;

export default withDefaultProps({
  r: 2,
})(NodeComponent);
