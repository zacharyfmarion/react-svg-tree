import * as React from 'react';
import { TreeNode } from '../helpers/TreeGraph';

export const DEFAULT_NODE_SIZE = 5;

export type NodeElement = React.ReactElement<Props>;

export interface Props {
  /** Unique id of the node */
  id: TreeNode;
  /** Array of child node id's */
  childNodes?: Array<TreeNode>;
  /** Radius of the node */
  r?: number;
  /** x position of the node, set by <Tree /> */
  x?: number;
  /** y position of the node, set by <Tree /> */
  y?: number;
  /**
   * Whether or not to show the label of the node. The label defaults to
   * the node's id, uncless the `labelText` prop is provided
   */
  showLabel?: boolean;
  /** Overrides the id as the label if showLabel and this are truthy */
  labelText?: string;
  /** On click event, which is passed to both the svg element and the label */
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
  className?: string;
  style?: Object;
  children?: React.ReactNode;
}

class NodeComponent extends React.Component<Props> {
  static defaultProps = {
    r: DEFAULT_NODE_SIZE,
  };

  render() {
    const {
      x,
      y,
      id,
      r,
      labelText,
      showLabel,
      onClick,
      className,
      style,
      children,
      ...props
    } = this.props;

    const child: any = React.Children.toArray(children)[0];
    return (
      <g style={style}>
        {!child && (
          <circle
            cx={x}
            cy={y}
            r={r}
            className={className}
            fill="rgb(15, 98, 189)"
            onClick={onClick}
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
            style={{ fontSize: 5 }}
            textAnchor="middle"
            x={x}
            y={(y || 0) + 1.5}
            onClick={onClick}
            {...props}
            fill="#fff"
          >
            {labelText ? labelText : id}
          </text>
        )}
      </g>
    );
  }
}

export default NodeComponent;
