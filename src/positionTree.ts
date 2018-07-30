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

export default function positionTree(
  tree: TreeGraph,
  options: Options,
): boolean {
  return true;
}
