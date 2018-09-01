import * as React from 'react';

import TreeGraph, { TreeNode, Position } from './helpers/TreeGraph';
import positionTree, { Options } from './helpers/positionTree';

interface NodeProps {
  x: number;
  y: number;
  id: any;
  r: number;
  graph: TreeGraph;
}

export interface Props extends Options {
  /** The element that you wish to display at the root of the tree */
  rootId?: TreeNode;
  /**
   * The data structure of vertices
   */
  vertices: Map<TreeNode, Array<TreeNode>>;
  /**
   * Used in tandem with the vertices prop to pass in the node size that
   * will be used for each node
   */
  nodeSize: number;
  /**
   * Function that is called when there is an error. Returns an error
   * message that explains what went wrong
   */
  onError?: (message: string) => void;
  /**
   * Function to render a node in the graph
   */
  children: (props: NodeProps) => React.ReactNode;
  className?: string;
}

const DEFAULT_NODE_SIZE = 10;

/**
 * Tree component
 */
class Network extends React.Component<Props> {
  static defaultProps = {
    width: 200,
    height: 100,
    rootId: 0,
    levelSeparation: 20,
    maxDepth: Infinity,
    siblingSeparation: 15,
    subtreeSeparation: 15,
  };

  /**
   * Render the nodes into a normalized tree based on the id's
   * of the nodes that are their children. Here we create a TreeGraph
   * object that maps to the Nodes and call positionTree, the algorithm
   * that determines the optimal x-coordinates for each node in the tree
   */
  renderTree = () => {
    const treeGraph = this.createTreeGraph();
    // If we can fit the nodes in the viewBox
    if (treeGraph) return this.renderFromVertexMap(treeGraph);
    return null;
  };

  /**
   * Render the node from the vertices map prop
   */
  renderFromVertexMap = (
    treeGraph: TreeGraph,
  ): Array<React.ReactNode> | null => {
    const { vertices, children } = this.props;
    if (!vertices) return null;
    const svgElements: Array<React.ReactNode> = [];
    vertices.forEach((childNodes: Array<TreeNode>, node: TreeNode) => {
      const [x, y] = treeGraph.getCoordinates(node);
      const createdNode = children({
        x,
        y,
        id: node,
        r: this.nodeSizeMap.get(node) || DEFAULT_NODE_SIZE,
        graph: treeGraph,
      });
      svgElements.push(
        this.createChildConnections(treeGraph, node, childNodes),
      );
      svgElements.push(createdNode);
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
    if (node === undefined) return [];
    childNodes.forEach((childNode: TreeNode) => {
      const [x, y] = treeGraph.getCoordinates(node);
      const [childX, childY] = treeGraph.getCoordinates(childNode);
      connectionNodes.push(
        <line
          x1={x}
          y1={y}
          x2={childX}
          y2={childY}
          stroke="#000"
          strokeWidth={1}
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
      this.props.vertices,
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
    if (!res && this.props.onError)
      this.props.onError('Tree could not be rendered in the viewing rect');
    return res ? treeGraph : null;
  };

  /**
   * Map of each node to its size
   */
  get nodeSizeMap(): Map<TreeNode, number> {
    const { vertices, nodeSize } = this.props;
    const sizeMap = new Map();
    vertices.forEach((_, node) => {
      sizeMap.set(node, nodeSize);
    });
    return sizeMap;
  }

  render() {
    const { width, height, className } = this.props;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className={className}>
        {this.renderTree()}
      </svg>
    );
  }
}

export default Network;
