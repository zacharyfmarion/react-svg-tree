import * as React from 'react';
import { TreeNode } from '../helpers/TreeGraph';

export type NodeElement = React.ReactElement<Props>;

export interface Props {
  id: TreeNode;
  childNodes?: Array<TreeNode>;
  className?: string;
  r?: number;
  x?: number;
  y?: number;
  showLabel?: boolean;
  children?: React.ReactNode;
}

const NodeComponent: React.SFC<Props> = ({
  x,
  y,
  id,
  r = 2,
  showLabel,
  className,
  children,
  ...props
}: Props) => {
  const child: any = React.Children.toArray(children)[0];
  return (
    <g>
      {!child && (
        <circle
          cx={x}
          cy={y}
          r={r}
          className={className}
          fill="rgb(15, 98, 189)"
          {...props}
        />
      )}
      {child &&
        React.cloneElement(child, {
          x: (x || 0) - child.props.width / 2,
          y: (y || 0) - child.props.height / 2,
          className,
          ...props,
        })}
      {showLabel && (
        <text
          fill="#fff"
          style={{ fontSize: 2 }}
          textAnchor="middle"
          x={x}
          y={(y || 0) + ((child && child.props && child.props.height) || r) / 3}
        >
          {id}
        </text>
      )}
    </g>
  );
};

export default NodeComponent;
