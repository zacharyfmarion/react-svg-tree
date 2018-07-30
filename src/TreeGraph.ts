/**
 * Class that represents a Tree graph.
 */

interface Position {
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
  leftNeighborMap: Map<number, number>;
  // TODO: Pretty sure the value of this needs to change
  prevNodeMap: Map<number, number>;

  constructor(vertexMap: Map<number, Array<number>>) {
    this.vertexMap = vertexMap;
    // TODO: Can we defer this to the first traversal? Props not
    this.parentMap = this.createParentMap();
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

  parent(node: number): number {
    const parent = this.parentMap.get(node);
    return parent === undefined ? -1 : parent;
  }

  prelim(node: number): number {
    const pos = this.positionMap.get(node);
    return pos ? pos.prelim : -1;
  }

  // The current node's leftmost offspring
  firstChild(node: number): number {
    const children = this.vertexMap.get(node) || [];
    return children[0] || -1;
  }

  // The current node's closest sibling node on the left.
  leftSibling(node: number) {
    // TODO
  }

  // The current node's closest sibling node on the right
  rightSibling(node: number) {
    // TODO
  }

  // The current node's x-coordinate
  xCoord(node: number): number {
    // TODO
    return 0;
  }

  // The current node's y-coordinate
  yCoord(node: number): number {
    // TODO
    return 0;
  }

  // The current node's modifier value
  modifier(node: number) {
    // TODO
  }

  // The current node's nearest neighbor to the left, at the same level
  leftNeighbor(node: number) {
    // TODO
  }
}

export default TreeGraph;
