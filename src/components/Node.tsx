import * as React from 'react';
import withDefaultProps from '../helpers/withDefaultProps';
import { TreeNode } from '../helpers/TreeGraph';

export type NodeElement = React.ReactElement<Props>;

export interface Props {
  id: TreeNode;
  childNodes?: Array<TreeNode>;
  className?: string;
  r?: number;
  cx?: number;
  cy?: number;
  showLabel?: boolean;
}

// TODO: Actually center the text properly
const NodeComponent: React.SFC<Props> = ({
  cx,
  cy,
  id,
  r,
  showLabel,
  className,
}: Props) => (
  <g>
    <circle
      cx={cx}
      cy={cy}
      r={r}
      className={className}
      fill="rgb(15, 98, 189)"
    />
    {showLabel && (
      <text
        fill="#fff"
        style={{ fontSize: 2 }}
        x={(cx || 0) - 0.4}
        y={(cy || 0) + 0.2}
      >
        {id}
      </text>
    )}
  </g>
);

export default withDefaultProps({
  r: 2,
})(NodeComponent);
