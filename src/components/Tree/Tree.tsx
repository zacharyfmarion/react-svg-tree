import * as React from 'react';
import { Props as NodeProps } from '../Node';
import styled from 'styled-components';

interface Props {
  width: number;
  height: number;
  className?: string;
  // children should only be Nodes
  children: Array<React.ReactElement<NodeProps>>;
}

type NodeElement = React.ReactElement<NodeProps>;

/**
 * Ideal API: Basically you provide nodes with a list of chidlren
 * ids, which are then used to render them in an ordered manner.
 * This will get quite complex logically and honestly shuold
 * probably be handled by an external library. Oh weill it's worth
 * a shot at the very least
 */
class Network extends React.Component<Props> {
  /**
   * Render the nodes into a normalized tree based on the id's
   * of the nodes that are their children.
   */
  renderChildNodes = () => {
    const { children } = this.props;
    const svgElements: Array<React.ReactNode> = [];
    React.Children.forEach(children, (child: NodeElement) => {
      // Determine the position of the node element in the SVG
      const [x, y] = [5, child.props.depth * 10 + 5];
      const clonedNode = React.cloneElement(child as any, { x, y });
      svgElements.push(clonedNode);
      // Now we create a line between each parent and child node
      svgElements.push(this.createChildConnections(child, x, y));
    });
    return svgElements;
  };

  /**
   * Create a connection between a parent node and each of each children
   */
  createChildConnections = (
    node: React.ReactElement<NodeProps>,
    x: number,
    y: number,
  ): Array<React.ReactNode> => {
    const connectionNodes: Array<React.ReactNode> = [];
    if (!node.props.childNodes) return [];
    node.props.childNodes.forEach((childId: number) => {
      const child: NodeElement | undefined = this.nodeMap.get(childId);
      if (child) {
        const [childX, childY] = [5, child.props.depth * 10 + 5];
        connectionNodes.push(<Line x1={x} y1={y} x2={childX} y2={childY} />);
      }
    });
    return connectionNodes;
  };

  /**
   * Map with the key as the id of the node and the value being
   * the id's of the child nodes
   */
  get nodeMap(): Map<number, NodeElement> {
    const children = React.Children.toArray(this.props.children);
    return new Map(
      children.map<[number, NodeElement]>((child: any) => [
        child.props.id,
        child,
      ]),
    );
  }

  render() {
    const { width, height, className } = this.props;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className={className}>
        {this.renderChildNodes()}
      </svg>
    );
  }
}

const Line = styled.line`
  fill: #000;
  stroke-width: 2px;
`;

export default Network;
