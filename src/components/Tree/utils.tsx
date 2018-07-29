// import { ReactElement, ReactNode } from 'react';
// import { Props as NodeProps } from '../Node';

/**
 * Get the maximum width of the tree. We need to keep track of the depth
 * of the tree during the traversal so we push null at the end of each
 * level, denoting the need to increment the depth.
 * @param children The children
 */
export function maxTreeWidth(nodeMap: Map<number, Array<number>>) {
  const visited = [0, null];
  const queue = [0];
  let maxWidth = 0;
  let currWidth = 0;
  while (queue.length > 0) {
    const node = queue.shift() || -1;
    // If the node is null then we have reached the end of the row and
    // we need to increment the depth
    if (node === null) {
      currWidth = 0;
      continue;
    }
    // We need to increment the maxWidth for a given row
    currWidth += 1;
    if (currWidth > maxWidth) maxWidth = currWidth;
    // If the node has no child nodes then we are at a leaf and we do
    // not need to enqueue any new nodes into the search
    const childNodes = nodeMap.get(node) || [];
    childNodes.forEach((childId: number) => {
      if (!visited.includes(childId)) {
        visited.push(childId);
        queue.push(childId);
      }
    });
  }
  return maxWidth;
}
