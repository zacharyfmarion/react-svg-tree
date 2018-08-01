import * as React from 'react';
import { NodeElement } from './Node';
import styled from 'styled-components';

import TreeGraph, { Position } from '../../TreeGraph';
import positionTree, { Options } from '../../positionTree';
import withDefaultProps from '../../helpers/withDefaultProps';

interface Props extends Options {
  className?: string;
  children: Array<NodeElement>;
  rootId?: number;
}

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
 * Tree component
 */
class Network extends React.Component<Props> {
  /**
   * Render the nodes into a normalized tree based on the id's
   * of the nodes that are their children. Here we create a TreeGraph
   * object that maps to the Nodes and call positionTree, the algorithm
   * that determines the optimal x-coordinates for each node in the tree
   */
  renderChildNodes = () => {
    const children = React.Children.toArray(this.props.children);
    const rootPosition: [number, Position] = [
      this.props.rootId || 0,
      { x: this.props.width / 2, y: 0, prelim: 0, mod: 0 },
    ];
    const vertexMap: Map<number, Array<number>> = new Map(
      children.map<[number, Array<number>]>((child: NodeElement) => [
        child.props.id,
        child.props.childNodes || [],
      ]),
    );
    const nodeSizeMap: Map<number, number> = new Map(
      children.map<[number, number]>((child: NodeElement) => [
        child.props.id,
        child.props.r || 2,
      ]),
    );
    const treeGraph = new TreeGraph(vertexMap, nodeSizeMap, rootPosition);
    const res = positionTree(treeGraph, rootPosition[0], {
      width: this.props.width,
      height: this.props.height,
      levelSeparation: this.props.levelSeparation,
      maxDepth: this.props.maxDepth,
      siblingSeparation: this.props.siblingSeparation,
      subtreeSeparation: this.props.subtreeSeparation,
    });

    // If we can fit the nodes in the viewBox
    const svgElements: Array<React.ReactNode> = [];
    if (res) {
      React.Children.forEach(children, (child: NodeElement) => {
        // Determine the position of the node element in the SVG
        const [x, y] = treeGraph.getCoordinates(child.props.id);
        const clonedNode = React.cloneElement(child as any, { cx: x, cy: y });
        svgElements.push(clonedNode);
        // Now we create a line between each parent and child node
        svgElements.push(this.createChildConnections(treeGraph, child, x, y));
      });
    }

    return svgElements;
  };

  /**
   * Create a connection between a parent node and each of each children
   */
  createChildConnections = (
    treeGraph: TreeGraph,
    node: NodeElement,
    x: number,
    y: number,
  ): Array<React.ReactNode> => {
    const connectionNodes: Array<React.ReactNode> = [];
    if (!node.props.childNodes) return [];
    node.props.childNodes.forEach((childId: number) => {
      const child: NodeElement | undefined = this.nodeMap.get(childId);
      if (child) {
        const [childX, childY] = treeGraph.getCoordinates(child.props.id);
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
      <TreeSvg viewBox={`0 0 ${width} ${height}`} className={className}>
        {this.renderChildNodes()}
      </TreeSvg>
    );
  }
}

export default withDefaultProps({
  width: 100,
  height: 100,
  rootId: 0,
  levelSeparation: 15,
  maxDepth: Infinity,
  siblingSeparation: 15,
  subtreeSeparation: 15,
})(Network);
