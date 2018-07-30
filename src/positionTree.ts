import TreeGraph from './TreeGraph';

/**
 * This file contains the code necessary for the correct aesthetic positioning
 * of nodes in a tree. The algorithm was modified from http://www.cs.unc.edu/techreports/89-034.pdf
 * and will most likely eventually be available as a separate package.
 * @author Zachary Marion
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

/**
 * Function that optimally positions the x coordinates of all nodes in
 * a tree for aesthetics. Adapted from http://www.cs.unc.edu/techreports/89-034.pdf
 *
 * @return {boolean} true if the tree fits and false if it does not
 */
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

/**
 * Initialize the list of previous nodes
 *
 * @param tree The tree object
 */
function initPrevNodeList(tree: TreeGraph) {
  console.log('initPrevNodeList');
}

/**
 * First walk of the tree, where we compute the preliminary
 * position values for the node placement
 *
 * @param tree The tree graph object
 * @param node The node we are starting the walk from
 * @param level The current depth of the tree
 */
function firstWalk(tree: TreeGraph, node: number, level: number) {
  console.log('firstWalk', node, level);
}

/**
 *
 * @param tree The tree graph object
 * @param node The node we are starting the walk from
 * @param level The current depth
 * @param modSum ???
 */
function secondWalk(
  tree: TreeGraph,
  node: number,
  level: number,
  modSum: number,
): boolean {
  console.log('secondWalk', node, level, modSum);
  return true;
}
