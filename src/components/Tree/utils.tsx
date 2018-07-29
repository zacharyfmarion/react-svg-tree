import { NodeElement } from './Node';

/**
 * A set of util functions for optimally positioning the nodes in a given tree. These
 * functions are referenced in http://www.cs.unc.edu/techreports/89-034.pdf
 */

export function parent(node: NodeElement) {
  // TODO make this work
  return node;
}

// The current node's leftmost offspring
export function firstChild(node: NodeElement) {
  // TODO
}

// The current node's closest sibling node on the left.
export function leftSibling(node: NodeElement) {
  // TODO
}

// The current node's closest sibling node on the right
export function rightSibling(node: NodeElement) {
  // TODO
}

// The current node's x-coordinate
export function xCoord(node: NodeElement) {
  // TODO
}

// The current node's y-coordinate
export function yCoord(node: NodeElement) {
  // TODO
}

// The current node's preliminary x-coordinate
export function prelim(node: NodeElement) {
  // TODO
}

// The current node's modifier value
export function modifier(node: NodeElement) {
  // TODO
}

// The current node's nearest neighbor to the left, at the same level
export function leftNeighbor(node: NodeElement) {
  // TODO
}
