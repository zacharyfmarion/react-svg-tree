import * as React from 'react';
import Node, { NodeElement } from './Node';
import styled from 'styled-components';

import TreeGraph, { TreeNode, Position } from '../helpers/TreeGraph';
import positionTree, { Options } from '../helpers/positionTree';
import withDefaultProps from '../helpers/withDefaultProps';

interface Props extends Options {
  /** The element that you wish to display at the root of the tree */
  rootId?: TreeNode;
  /** Whther or not to show the labels on each node */
  showLabels?: boolean;
  /**
   * A data structure of vertices that can be passed in as an alternative
   * to using the Node elements passed in a children
   */
  vertices?: Map<TreeNode, Array<TreeNode>>;
  /**
   * Used in tandem with the vertices prop to pass in the node size that
   * will be used for each node
   */
  nodeSize?: number;
  children?: Array<NodeElement>;
  className?: string;
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
  renderTree = () => {
    const treeGraph = this.createTreeGraph();
    // If we can fit the nodes in the viewBox
    if (treeGraph) {
      return this.props.vertices
        ? this.renderFromVertexMap(treeGraph)
        : this.renderFromChildNodes(treeGraph);
    }
    return null;
  };

  /**
   * Render the node from the vertices map prop
   */
  renderFromVertexMap = (
    treeGraph: TreeGraph,
  ): Array<React.ReactNode> | null => {
    const { vertices, showLabels } = this.props;
    if (!vertices) return null;
    const svgElements: Array<React.ReactNode> = [];
    vertices.forEach((childNodes: Array<TreeNode>, node: TreeNode) => {
      const [x, y] = treeGraph.getCoordinates(node);
      const createdNode = (
        <Node
          id={node}
          cx={x}
          cy={y}
          r={this.nodeSizeMap.get(node)}
          showLabel={showLabels}
          key={node || '0'}
        />
      );
      svgElements.push(
        this.createChildConnections(treeGraph, node, childNodes),
      );
      svgElements.push(createdNode);
    });

    return svgElements;
  };

  /**
   * Render the node from the child Nodes elements that were passed in
   */
  renderFromChildNodes = (
    treeGraph: TreeGraph,
  ): Array<React.ReactNode> | null => {
    const children = React.Children.toArray(this.props.children);
    const svgElements: Array<React.ReactNode> = [];

    React.Children.forEach(children, (child: NodeElement) => {
      // Determine the position of the node element in the SVG
      const [x, y] = treeGraph.getCoordinates(child.props.id);
      const clonedNode = React.cloneElement(child as any, {
        cx: x,
        cy: y,
        r: this.nodeSizeMap.get(child.props.id),
        showLabel: this.props.showLabels,
        key: child.props.id,
      });
      // Now we create a line between each parent and child node
      svgElements.push(
        this.createChildConnections(
          treeGraph,
          child.props.id,
          child.props.childNodes || [],
        ),
      );
      svgElements.push(clonedNode);
    });

    return svgElements;
  };

  /**
   * Create a connection between a parent node and each of each children
   */
  createChildConnections = (
    treeGraph: TreeGraph,
    node: TreeNode,
    childNodes: Array<TreeNode>,
  ): Array<React.ReactNode> => {
    const connectionNodes: Array<React.ReactNode> = [];
    if (!node) return [];
    childNodes.forEach((childNode: TreeNode) => {
      const [x, y] = treeGraph.getCoordinates(node);
      const [childX, childY] = treeGraph.getCoordinates(childNode);
      connectionNodes.push(
        <Line
          x1={x}
          y1={y}
          x2={childX}
          y2={childY}
          key={`${node}-${childNode}`}
        />,
      );
    });
    return connectionNodes;
  };

  /**
   * Here we create the treeGraph object and call our positionTree alg,
   * which determines the final x and y positions of the nodes. We return
   * null if we cannot fit the nodes into the viewing box
   */
  createTreeGraph = (): TreeGraph | null => {
    const rootPosition: [TreeNode, Position] = [
      this.props.rootId || 0,
      { x: this.props.width / 2, y: 5, prelim: 0, mod: 0 },
    ];
    const treeGraph = new TreeGraph(
      this.vertexMap,
      this.nodeSizeMap,
      rootPosition,
    );
    const res = positionTree(treeGraph, rootPosition[0], {
      width: this.props.width,
      height: this.props.height,
      levelSeparation: this.props.levelSeparation,
      maxDepth: this.props.maxDepth,
      siblingSeparation: this.props.siblingSeparation,
      subtreeSeparation: this.props.subtreeSeparation,
    });
    return res ? treeGraph : null;
  };

  /**
   * If child nodes are passed in, map over them to get the vertex map.
   * Otherwise we just use the `vertices` prop
   */
  get vertexMap(): Map<TreeNode, Array<TreeNode>> {
    const { vertices, children } = this.props;
    if (vertices) return vertices;
    if (!children)
      throw new Error(
        'Children must be passed in if no vertices prop is provided',
      );
    return new Map(
      React.Children.toArray(children).map<[TreeNode, Array<TreeNode>]>(
        (child: NodeElement) => [child.props.id, child.props.childNodes || []],
      ),
    );
  }

  /**
   * Map of each node to it's size
   */
  get nodeSizeMap(): Map<TreeNode, number> {
    const { vertices, nodeSize, children } = this.props;
    if (vertices) {
      const sizeMap = new Map();
      vertices.forEach((_, node) => {
        sizeMap.set(node, nodeSize);
      });
      return sizeMap;
    }
    const childArray = React.Children.toArray(children);
    return new Map(
      childArray.map<[TreeNode, number]>((child: NodeElement) => [
        child.props.id,
        child.props.r || 2,
      ]),
    );
  }

  /**
   * Map with the key as the id of the node and the value being
   * the id's of the child nodes
   */
  get nodeMap(): Map<TreeNode, NodeElement> {
    const children = React.Children.toArray(this.props.children);
    return new Map(
      children.map<[TreeNode, NodeElement]>((child: any) => [
        child.props.id,
        child,
      ]),
    );
  }

  render() {
    const { width, height, className } = this.props;
    return (
      <TreeSvg viewBox={`0 0 ${width} ${height}`} className={className}>
        {this.renderTree()}
      </TreeSvg>
    );
  }
}

export default withDefaultProps({
  width: 200,
  height: 150,
  rootId: 0,
  nodeSize: 2,
  levelSeparation: 10,
  maxDepth: Infinity,
  siblingSeparation: 10,
  subtreeSeparation: 10,
})(Network);
