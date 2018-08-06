import * as React from 'react';
import styled from 'styled-components';
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

const Text = styled.text`
  font-size: 2px;
  fill: #fff;
`;

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
      <Text x={(cx || 0) - 0.4} y={(cy || 0) + 0.2}>
        {id}
      </Text>
    )}
  </g>
);

export default withDefaultProps({
  r: 2,
})(NodeComponent);
