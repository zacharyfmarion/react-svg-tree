/**
 * Class that represents a Tree graph.
 */

class TreeGraph {
  vertexMap: Map<number, Array<number>>;
  parentMap: Map<number, number>;

  constructor(vertexMap: Map<number, Array<number>>) {
    this.vertexMap = vertexMap;
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

  parent(node: number): number {
    return this.parentMap.get(node) || -1;
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
  xCoord(node: number) {
    // TODO
  }

  // The current node's y-coordinate
  yCoord(node: number) {
    // TODO
  }

  // The current node's preliminary x-coordinate
  prelim(node: number) {
    // TODO
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
