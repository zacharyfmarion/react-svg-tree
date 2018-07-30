import TreeGraph from './TreeGraph';

/**
 * Function that optimally positions the x coordinates of all nodes in
 * a tree for aesthetics. Adapted from http://www.cs.unc.edu/techreports/89-034.pdf
 *
 * @return {boolean} true if the tree fits and false if it does not
 */

export interface Options {
  /**
   * The fixed distance between adjacent levels of the tree. Used in
   * determining they-coordinate of a node being positioned.
   */
  levelSeparation?: number;
  /**
   * The maximum number of levels in the tree to be positioned. If all
   * levels are to be positioned, set this value to positive infinity (or an
   * appropriate numerical value).
   */
  maxDepth?: number;
  /**
   * The minimum distance between adjacent siblings of the tree.
   */
  siblingSeparation?: number;
  /**
   * The minimum distance between adjacent subtrees of a tree. For
   * proper aesthetics, this value is normally somewhat larger than
   * SiblingSeparation.
   */
  subtreeSeparation?: number;
}

// GLOBALS
let xTopAdjustment: number;
let yTopAdjustment: number;

export default function positionTree(
  tree: TreeGraph,
  node: number,
  options: Options,
): boolean {
  if (tree.hasNode(node)) {
    // Intialize the list of previous nodes at each level
    initPrevNodeList(tree);
    // Do the preliminary positioning with a postorder walk
    firstWalk(tree, node, 0);
    // Determine how to adjust all the nodes with respect to
    // the location of the root.
    const xTopAdjustment = tree.xCoord(node) - tree.prelim(node);
    const yTopAdjustment = tree.yCoord(node);
    console.log(xTopAdjustment, yTopAdjustment);
    return secondWalk(tree, node, 0, 0);
  }
  return true;
}

function initPrevNodeList(tree: TreeGraph) {
  console.log('initPrevNodeList');
}

/**
 * First walk of the tree, where we compute the preliminary
 * position values for the node placement
 *
 * @param node The node we are starting the walk from
 * @param level The current depth of the tree
 */
function firstWalk(tree: TreeGraph, node: number, level: number) {
  console.log('firstWalk', node, level);
}

function secondWalk(
  tree: TreeGraph,
  node: number,
  level: number,
  modSum: number,
): boolean {
  console.log('secondWalk', node, level, modSum);
  return true;
}
