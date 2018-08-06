/**
 * Class that represents a Tree graph.
 */

export interface Position {
  x: number;
  y: number;
  prelim: number;
  mod: number;
}

// Nodes can be represented by numbers or strings, they just need
// to be unique
export type TreeNode = number | string | null;

/**
 * Map.get but with a default value
 */
export function mapGet(map: Map<any, any>, key: any, defaultValue: any = null) {
  const ret = map.get(key);
  return ret === undefined ? defaultValue : ret;
}

class TreeGraph {
  vertexMap: Map<TreeNode, Array<TreeNode>>;
  parentMap: Map<TreeNode, TreeNode>;
  positionMap: Map<TreeNode, Position>;
  leftNeighborMap: Map<TreeNode, TreeNode | null>;
  prevNodeMap: Map<TreeNode, TreeNode | null>;
  nodeSizeMap: Map<TreeNode, number>;
  xTopAdjustment: number;
  yTopAdjustment: number;

  constructor(
    vertexMap: Map<TreeNode, Array<TreeNode>>,
    nodeSizeMap: Map<TreeNode, number>,
    rootNodePosition: [TreeNode, Position],
  ) {
    this.vertexMap = vertexMap;
    this.nodeSizeMap = nodeSizeMap;
    // TODO: Can we defer this to the first traversal? Props not
    this.parentMap = this.createParentMap();
    this.positionMap = new Map([rootNodePosition]);
    this.leftNeighborMap = new Map();
    this.prevNodeMap = new Map();
  }

  // Create mapping of child id to parent id
  createParentMap(): Map<TreeNode, TreeNode> {
    const parentMap: Map<TreeNode, TreeNode> = new Map();
    this.vertexMap.forEach((children, parent) => {
      if (!children) return;
      children.forEach(child => {
        parentMap.set(child, parent);
      });
    });
    return parentMap;
  }

  // Whether or node the tree has a node
  hasNode(node: TreeNode): boolean {
    return this.vertexMap.get(node) !== undefined;
  }

  // Return whether the node is a leaf
  isLeaf(node: TreeNode): boolean {
    return mapGet(this.vertexMap, node, []).length === 0;
  }

  // Parent of the node
  parent(node: TreeNode): TreeNode {
    return mapGet(this.parentMap, node);
  }

  // Prelim position value of the node
  prelim(node: TreeNode): number {
    const pos = this.positionMap.get(node);
    return pos ? pos.prelim : 0;
  }

  // The current node's x-coordinate
  xCoord(node: TreeNode): number {
    const pos = this.positionMap.get(node);
    return pos ? pos.x : 0;
  }

  // The current node's y-coordinate
  yCoord(node: TreeNode): number {
    const pos = this.positionMap.get(node);
    return pos ? pos.y : 0;
  }

  getCoordinates(node: TreeNode): [number, number] {
    return [this.xCoord(node), this.yCoord(node)];
  }

  // The current node's modifier value
  modifier(node: TreeNode): number {
    const pos = this.positionMap.get(node);
    return pos ? pos.mod : 0;
  }

  // The current node's leftmost offspring
  firstChild(node: TreeNode): TreeNode {
    const children = mapGet(this.vertexMap, node, []);
    return children.length > 0 ? children[0] : null;
  }

  // Get the prevNode for a given level
  prevNode(level: TreeNode): TreeNode {
    return mapGet(this.prevNodeMap, level);
  }

  hasLeftSibling(node: TreeNode): boolean {
    return this.leftSibling(node) !== null;
  }

  hasRightSibling(node: TreeNode): boolean {
    return this.rightSibling(node) !== null;
  }

  // The current node's closest sibling node on the left.
  leftSibling(node: TreeNode) {
    const siblings = this.getSiblings(node);
    const nodeIndex = siblings.indexOf(node);
    return nodeIndex > 0 ? siblings[nodeIndex - 1] : null;
  }

  // Array of all left siblings
  leftSiblings(node: TreeNode): Array<TreeNode> {
    const siblings = this.getSiblings(node);
    return siblings.filter((curr, index) => index < siblings.indexOf(node));
  }

  // The current node's closest sibling node on the right
  rightSibling(node: TreeNode): TreeNode {
    const siblings = this.getSiblings(node);
    const nodeIndex = siblings.indexOf(node);
    return siblings.length - 1 > nodeIndex ? siblings[nodeIndex + 1] : null;
  }

  // The current node's nearest neighbor to the left, at the same level
  leftNeighbor(node: TreeNode) {
    return mapGet(this.leftNeighborMap, node);
  }

  /**
   * -------------------------------------------------------
   * Helper methods
   * -------------------------------------------------------
   */

  // Get siblings of a node
  getSiblings(node: TreeNode): Array<TreeNode> {
    const parent = mapGet(this.parentMap, node);
    return mapGet(this.vertexMap, parent, []);
  }

  /**
   * Function to update the position map, adding the default
   * values for the position attributes if they do not already
   * exist in the map
   */
  updatePositionValue(key: TreeNode, attributes: Partial<Position>) {
    this.positionMap.set(key, {
      x: 0,
      y: 0,
      prelim: 0,
      mod: 0,
      ...this.positionMap.get(key),
      ...attributes,
    });
  }

  /**
   * Return the mean node size of n nodes
   */
  meanNodeSize(nodes: Array<TreeNode>): number {
    if (!nodes || nodes.length === 0)
      throw new Error('Cannot compute mean of input');
    return (
      nodes
        .map(node => mapGet(this.nodeSizeMap, node, 0))
        .reduce((a, b) => a + b) / nodes.length
    );
  }
}

export default TreeGraph;
