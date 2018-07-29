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

const TreeSvg = styled.svg`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Line = styled.line`
  stroke: #000;
  stroke-width: 1;
`;

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
      const [x, y] = this.getNodeCoordinates(child);
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
        const [childX, childY] = this.getNodeCoordinates(child);
        connectionNodes.push(<Line x1={x} y1={y} x2={childX} y2={childY} />);
      }
    });
    return connectionNodes;
  };

  /**
   * Get the (x, y) coordinates of a given node
   */
  getNodeCoordinates = (node: NodeElement): [number, number] => {
    const numNodes = this.widthMap.get(node.props.depth) || 0;
    console.log(this.widthMap);
    const { width } = this.props;
    return [
      (width / (numNodes + 1)) * (node.props.rowIndex + 1),
      node.props.depth * 10 + 5,
    ];
  };

  /**
   * Get the width of the tree at each depth. We essentially perform
   * a BFS while keeping track of the current depth of the tree and
   * the number of nodes at that depth
   */
  get widthMap(): Map<number, number> {
    const visited = [0];
    const queue = [0, -1];
    let currWidth = 0;
    let currDepth = 0;
    const widthMap = new Map();
    while (queue.length > 0) {
      const nodeId = queue.shift();
      // If the node is -1 and the queue is empty, then we have reached
      // the end of the traversal. If the node is -1 but the next ndoe is not,
      // then we have reached the end of the row and we need to increment the depth
      if (nodeId === -1) {
        widthMap.set(currDepth, currWidth);
        currWidth = 0;
        currDepth += 1;
        if (queue.length === 0) break;
        queue.push(-1);
        continue;
      } else if (nodeId === undefined) continue;
      // We need to increment the maxWidth for a given row
      currWidth += 1;
      // If the node has no child nodes then we are at a leaf and we do
      // not need to enqueue any new nodes into the search
      const node = this.nodeMap.get(nodeId);
      if (!node) continue;
      const childNodes = node.props.childNodes || [];
      childNodes.forEach((childId: number) => {
        if (!visited.includes(childId)) {
          visited.push(childId);
          queue.push(childId);
        }
      });
    }
    return widthMap;
  }

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
      <TreeSvg viewBox={`0 0 ${width} ${height}`} className={className}>
        {this.renderChildNodes()}
      </TreeSvg>
    );
  }
}

export default Network;
