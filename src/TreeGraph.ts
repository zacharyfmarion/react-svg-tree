/**
 * Class that represents a Tree graph.
 */

export interface Position {
  x: number;
  y: number;
  prelim: number;
  mod: number;
}

class TreeGraph {
  vertexMap: Map<number, Array<number>>;
  parentMap: Map<number, number>;
  positionMap: Map<number, Position>;
  lsonMap: Map<number, number>;
  rLinkMap: Map<number, number>;
  leftNeighborMap: Map<number, number | null>;
  prevNodeMap: Map<number, number | null>;
  nodeSizeMap: Map<number, number>;

  constructor(
    vertexMap: Map<number, Array<number>>,
    nodeSizeMap: Map<number, number>,
    rootNodePosition: [number, Position],
  ) {
    this.vertexMap = vertexMap;
    this.nodeSizeMap = nodeSizeMap;
    // TODO: Can we defer this to the first traversal? Props not
    this.parentMap = this.createParentMap();
    this.positionMap = new Map([rootNodePosition]);
    this.lsonMap = new Map();
    this.rLinkMap = new Map();
    this.leftNeighborMap = new Map();
    this.prevNodeMap = new Map();
  }

  // Create mapping of child id to parent id
  createParentMap(): Map<number, number> {
    const parentMap: Map<number, number> = new Map();
    this.vertexMap.forEach((children, parent) => {
      if (!children) return;
      children.forEach(child => {
        parentMap.set(child, parent);
      });
    });
    return parentMap;
  }

  // Whether or node the tree has a node
  hasNode(node: number): boolean {
    return this.vertexMap.get(node) !== undefined;
  }

  // Return whether the node is a leaf
  isLeaf(node: number): boolean {
    return this.mapGet(this.vertexMap, node, []).length === 0;
  }

  // Parent of the node
  parent(node: number): number {
    return this.mapGet(this.parentMap, node);
  }

  // Prelim position value of the node
  prelim(node: number): number {
    const pos = this.positionMap.get(node);
    return pos ? pos.prelim : 0;
  }

  // The current node's x-coordinate
  xCoord(node: number): number {
    const pos = this.positionMap.get(node);
    return pos ? pos.x : 0;
  }

  // The current node's y-coordinate
  yCoord(node: number): number {
    const pos = this.positionMap.get(node);
    return pos ? pos.y : 0;
  }

  getCoordinates(node: number): [number, number] {
    return [this.xCoord(node), this.yCoord(node)];
  }

  // The current node's modifier value
  modifier(node: number) {
    const pos = this.positionMap.get(node);
    return pos ? pos.mod : 0;
  }

  // The current node's leftmost offspring
  firstChild(node: number): number {
    const children = this.mapGet(this.vertexMap, node, []);
    return children.length > 0 ? children[0] : -1;
  }

  // Get the prevNode for a given level
  prevNode(level: number): number {
    return this.mapGet(this.prevNodeMap, level);
  }

  hasLeftSibling(node: number): boolean {
    return this.leftSibling(node) !== -1;
  }

  hasRightSibling(node: number): boolean {
    return this.rightSibling(node) !== -1;
  }

  // The current node's closest sibling node on the left.
  leftSibling(node: number) {
    const siblings = this.getSiblings(node);
    const nodeIndex = siblings.indexOf(node);
    return nodeIndex > 0 ? siblings[nodeIndex - 1] : -1;
  }

  // The current node's closest sibling node on the right
  rightSibling(node: number) {
    const siblings = this.getSiblings(node);
    const nodeIndex = siblings.indexOf(node);
    return siblings.length - 1 > nodeIndex ? siblings[nodeIndex + 1] : -1;
  }

  // The current node's nearest neighbor to the left, at the same level
  leftNeighbor(node: number) {
    return this.mapGet(this.leftNeighborMap, node);
  }

  /**
   * -------------------------------------------------------
   * Helper methods
   * -------------------------------------------------------
   */

  // Get siblings of a node
  getSiblings(node: number): Array<number> {
    const parent = this.mapGet(this.parentMap, node);
    return this.mapGet(this.vertexMap, parent, []);
  }

  /**
   * Map.get but with a default value
   */
  mapGet(map: Map<any, any>, key: any, defaultValue: any = -1) {
    const ret = map.get(key);
    return ret === undefined ? defaultValue : ret;
  }

  /**
   * Function to update the position map, adding the default
   * values for the position attributes if they do not already
   * exist in the map
   */
  updatePositionValue(key: number, attributes: Partial<Position>) {
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
  meanNodeSize(nodes: Array<number>) {
    if (!nodes || nodes.length === 0)
      throw new Error('Cannot compute mean of input');
    return (
      nodes
        .map(node => this.mapGet(this.nodeSizeMap, node, 0))
        .reduce((a, b) => a + b) / nodes.length
    );
  }
}

export default TreeGraph;
