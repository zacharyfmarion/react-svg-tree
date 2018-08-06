import TreeGraph, { TreeNode } from './TreeGraph';

/**
 * This file contains the code necessary for the correct aesthetic positioning
 * of nodes in a tree. The algorithm was modified from http://www.cs.unc.edu/techreports/89-034.pdf
 * and will most likely eventually be available as a separate package.
 * @author Zachary Marion
 */

export interface Options {
  /**
   * The width of the viewbox that the tree is being rendered in
   */
  width: number;
  /**
   * The height of the viewbox that the tree is being rendered in
   */
  height: number;
  /**
   * The fixed distance between adjacent levels of the tree. Used in
   * determining they-coordinate of a node being positioned.
   */
  levelSeparation: number;
  /**
   * The maximum number of levels in the tree to be positioned. If all
   * levels are to be positioned, set this value to positive infinity (or an
   * appropriate numerical value).
   */
  maxDepth: number;
  /**
   * The minimum distance between adjacent siblings of the tree.
   */
  siblingSeparation: number;
  /**
   * The minimum distance between adjacent subtrees of a tree. For
   * proper aesthetics, this value is normally somewhat larger than
   * SiblingSeparation.
   */
  subtreeSeparation: number;
}

/**
 * Function that optimally positions the x coordinates of all nodes in
 * a tree for aesthetics. Adapted from http://www.cs.unc.edu/techreports/89-034.pdf
 *
 * @param tree The tree graph object
 * @param node The node we are starting the walk from
 * @param options Options for the positioning
 * @return {boolean} true if the tree fits and false if it does not
 */
export default function positionTree(
  tree: TreeGraph,
  node: TreeNode,
  options: Options,
): boolean {
  if (tree.hasNode(node)) {
    // Do the preliminary positioning with a postorder walk
    firstWalk(tree, node, 0, options);
    // Determine how to adjust all the nodes with respect to
    // the location of the root.
    tree.xTopAdjustment = tree.xCoord(node) - tree.prelim(node);
    tree.yTopAdjustment = tree.yCoord(node);
    return secondWalk(tree, node, 0, 0, options);
  }
  return true;
}

/**
 * First walk of the tree, where we compute the preliminary
 * position values for the node placement
 *
 * @param tree The tree graph object
 * @param node The node we are starting the walk from
 * @param level The current depth of the tree
 * @param options Options for the positioning
 */
export function firstWalk(
  tree: TreeGraph,
  node: TreeNode,
  level: number,
  options: Options,
) {
  tree.leftNeighborMap.set(node, tree.prevNode(level));
  tree.prevNodeMap.set(level, node);

  if (tree.isLeaf(node) || level === options.maxDepth) {
    const leftSibling = tree.leftSibling(node);
    if (leftSibling !== null) {
      // Determine the preliminary x-coordinate based on:
      // 1. The preliminary x-coordinate of the left sibling,
      // 2. The separation between sibling nodes, and
      // 3. The mean size of left sibling and current node.
      const prelim =
        tree.prelim(leftSibling) +
        options.siblingSeparation +
        tree.meanNodeSize([leftSibling, node]);
      tree.updatePositionValue(node, { prelim });
    } else {
      // No sibling on the left to worry about
      tree.updatePositionValue(node, { prelim: 0 });
    }
  } else {
    // This Node is not a leaf, so call this procedure
    // recursively for each of its offspring.
    let leftMost = tree.firstChild(node);
    let rightMost = leftMost;
    firstWalk(tree, leftMost, level + 1, options);

    while (tree.hasRightSibling(rightMost)) {
      rightMost = tree.rightSibling(rightMost);
      firstWalk(tree, rightMost, level + 1, options);
    }

    const midPoint = (tree.prelim(leftMost) + tree.prelim(rightMost)) / 2;
    const leftSibling = tree.leftSibling(node);

    if (leftSibling !== null) {
      const prelim =
        tree.prelim(leftSibling) +
        options.siblingSeparation +
        tree.meanNodeSize([leftSibling, node]);
      const mod = prelim - midPoint;
      tree.updatePositionValue(node, { prelim, mod });
      apportion(tree, node, level, options);
    } else {
      tree.updatePositionValue(node, { prelim: midPoint });
    }
  }
}

/**
 * Apportion the tree
 *
 * @param tree The tree graph object
 * @param node The node we are starting the walk from
 * @param level The current depth of the tree
 * @param options Options for the positioning
 */
export function apportion(
  tree: TreeGraph,
  node: TreeNode,
  level: number,
  options: Options,
) {
  let leftMost = tree.firstChild(node);
  // THIS SHOULD BE C BUT IT IS STILL D
  let neighbor = tree.leftNeighbor(leftMost);
  let compareDepth = 1;
  let depthToStop = options.maxDepth - level;

  while (
    leftMost !== null &&
    neighbor !== null &&
    compareDepth <= depthToStop
  ) {
    // Compute the location of leftmost and where it should
    // be with respect to neighbor.
    let leftModsum = 0;
    let rightModsum = 0;
    let ancestorLeftMost: TreeNode = leftMost;
    let ancestorNeighbor: TreeNode = neighbor;

    for (let i = 0; i < compareDepth; i++) {
      ancestorLeftMost = tree.parent(ancestorLeftMost);
      ancestorNeighbor = tree.parent(ancestorNeighbor);
      rightModsum = rightModsum + tree.modifier(ancestorLeftMost);
      leftModsum = leftModsum + tree.modifier(ancestorNeighbor);
    }
    // Find the moveDistance, and apply it to Node's subtree.
    // Add appropriate portions to smaller interior subtrees.
    let moveDistance =
      tree.prelim(neighbor) +
      leftModsum +
      options.subtreeSeparation +
      tree.meanNodeSize([leftMost, neighbor]) -
      (tree.prelim(leftMost) + rightModsum);

    if (moveDistance > 0) {
      // Count interior sibling subtrees in LeftSiblings
      let temp = node;
      let leftSiblings = 0;
      while (temp !== null && temp !== ancestorNeighbor) {
        leftSiblings += 1;
        temp = tree.leftSibling(temp);
      }
      if (temp !== null) {
        // Apply portions to appropriate leftsibling subtrees
        const portion = moveDistance / leftSiblings;
        temp = node;
        while (temp !== ancestorNeighbor) {
          const prelim = tree.prelim(temp) + moveDistance;
          const mod = tree.modifier(temp) + moveDistance;
          moveDistance = moveDistance - portion;
          tree.updatePositionValue(temp, { prelim, mod });
          temp = tree.leftSibling(temp);
        }
      } else {
        // Don't need to move anything--it needs to
        // be done by an ancestor because
        // AncestorNeighbor and AncestorLeftmost are
        // not siblings of each other.
        return;
      }
    }
    // Determine the leftmost descendant of Node at the next
    // lower level to compare its positioning against that of
    // its Neighbor.
    compareDepth += 1;
    leftMost = tree.isLeaf(leftMost)
      ? getLeftMost(tree, node, 0, compareDepth)
      : tree.firstChild(leftMost);
    neighbor = tree.leftNeighbor(leftMost);
  }
}

/**
 *
 * @param tree The tree graph object
 * @param node The node we are starting the walk from
 * @param level refers to the level below the node whose leftmost
 * descendant is being found.
 * This is not the absolute level used in the main walks
 * @param depth The compare depth
 */
export function getLeftMost(
  tree: TreeGraph,
  node: TreeNode,
  level: number,
  depth: number,
): TreeNode {
  if (level >= depth) return node;
  let leftMost = node;
  while (tree.firstChild(leftMost) === null && tree.hasRightSibling(leftMost)) {
    leftMost = tree.rightSibling(leftMost);
  }
  leftMost = tree.firstChild(leftMost);
  return getLeftMost(tree, leftMost, level + 1, depth);
}

/**
 *
 * @param tree The tree graph object
 * @param node The node we are starting the walk from
 * @param level The current depth
 * @param modSum ???
 */
export function secondWalk(
  tree: TreeGraph,
  node: TreeNode,
  level: number,
  modSum: number,
  options: Options,
): boolean {
  let result = true;
  if (level <= options.maxDepth) {
    let xTemp = tree.xTopAdjustment + tree.prelim(node) + modSum;
    let yTemp = tree.yTopAdjustment + level * options.levelSeparation;
    // Check to see that xTemp and yTemp fit within the viewing rect
    if (checkExtendsRange(xTemp, yTemp, options)) {
      tree.updatePositionValue(node, { x: xTemp, y: yTemp });
      if (!tree.isLeaf(node)) {
        // Apply the modifier value for this node to all its offspring
        result = secondWalk(
          tree,
          tree.firstChild(node),
          level + 1,
          modSum + tree.modifier(node),
          options,
        );
      }
      if (result && tree.hasRightSibling(node)) {
        result = secondWalk(
          tree,
          tree.rightSibling(node),
          level,
          modSum,
          options,
        );
      }
    } else {
      // Continuing would put the tree outside of the *)
      // drawable extents range.
      result = false;
    }
  }
  return result;
}

/**
 * Check that a pair of x,y coordinates can be rendered inside the svg box
 *
 * @param x The x coordinate of the node
 * @param y The y coordinate of the node
 * @param options Options for the positioning
 */
export function checkExtendsRange(
  x: number,
  y: number,
  options: Options,
): boolean {
  return x >= 0 && x <= options.width && y >= 0 && y <= options.height;
}
