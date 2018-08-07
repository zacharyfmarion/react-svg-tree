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

class NodeComponent extends React.Component<Props> {
  static defaultProps = {
    r: 5,
  };

  render() {
    const {
      x,
      y,
      id,
      r,
      showLabel,
      className,
      children,
      ...props
    } = this.props;

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
            style={{ fontSize: 5 }}
            textAnchor="middle"
            x={x}
            y={(y || 0) + 1.5}
          >
            {id}
          </text>
        )}
      </g>
    );
  }
}

export default NodeComponent;
