"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// GLOBALS
let xTopAdjustment;
let yTopAdjustment;
/**
 * Function that optimally positions the x coordinates of all nodes in
 * a tree for aesthetics. Adapted from http://www.cs.unc.edu/techreports/89-034.pdf
 *
 * @param tree The tree graph object
 * @param node The node we are starting the walk from
 * @param options Options for the positioning
 * @return {boolean} true if the tree fits and false if it does not
 */
function positionTree(tree, node, options) {
    if (tree.hasNode(node)) {
        // Do the preliminary positioning with a postorder walk
        firstWalk(tree, node, 0, options);
        // Determine how to adjust all the nodes with respect to
        // the location of the root.
        xTopAdjustment = tree.xCoord(node) - tree.prelim(node);
        yTopAdjustment = tree.yCoord(node);
        console.log(xTopAdjustment, yTopAdjustment);
        return secondWalk(tree, node, 0, 0, options);
    }
    return true;
}
exports.default = positionTree;
/**
 * First walk of the tree, where we compute the preliminary
 * position values for the node placement
 *
 * @param tree The tree graph object
 * @param node The node we are starting the walk from
 * @param level The current depth of the tree
 * @param options Options for the positioning
 */
function firstWalk(tree, node, level, options) {
    console.log('firstWalk', node, level);
    tree.leftNeighborMap.set(node, tree.prevNode(level));
    tree.prevNodeMap.set(level, node);
    if (tree.isLeaf(node) || level === options.maxDepth) {
        const leftSibling = tree.leftSibling(node);
        if (leftSibling !== -1) {
            // Determine the preliminary x-coordinate based on:
            // 1. The preliminary x-coordinate of the left sibling,
            // 2. The separation between sibling nodes, and
            // 3. The mean size of left sibling and current node.
            const prelim = tree.prelim(leftSibling) +
                options.siblingSeparation +
                tree.meanNodeSize([leftSibling, node]);
            tree.updatePositionValue(node, { prelim });
        }
        else {
            // No sibling on the left to worry about
            tree.updatePositionValue(node, { prelim: 0 });
        }
    }
    else {
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
        if (tree.hasLeftSibling(node)) {
            const leftSibling = tree.leftSibling(node);
            const prelim = tree.prelim(leftSibling) +
                options.siblingSeparation +
                tree.meanNodeSize([leftSibling, node]);
            const mod = prelim - midPoint;
            tree.updatePositionValue(node, { prelim, mod });
            apportion(tree, node, level, options);
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
function apportion(tree, node, level, options) {
    let leftMost = tree.firstChild(node);
    let neighbor = tree.leftNeighbor(leftMost);
    let compareDepth = 1;
    let depthToStop = options.maxDepth - level;
    while (leftMost !== -1 && neighbor !== -1 && compareDepth < depthToStop) {
        // Compute the location of leftmost and where it should
        // be with respect to neighbor.
        let leftModsum = 0;
        let rightModsum = 0;
        let ancestorLeftMost = leftMost;
        let ancestorNeighbor = neighbor;
        for (let i = 0; i < compareDepth; i++) {
            ancestorLeftMost = tree.parent(ancestorLeftMost);
            ancestorNeighbor = tree.parent(ancestorNeighbor);
            rightModsum = rightModsum + tree.modifier(ancestorLeftMost);
            leftModsum = leftModsum + tree.modifier(ancestorNeighbor);
        }
        // Find the floveDistance, and apply it to Node's subtree.
        // Add appropriate portions to smaller interior subtrees.
        let moveDistance = tree.prelim(neighbor) +
            leftModsum +
            options.subtreeSeparation +
            tree.meanNodeSize([leftMost, neighbor]) -
            (tree.prelim(leftMost) + rightModsum);
        if (moveDistance > 0) {
            // Count interior sibling subtrees in LeftSiblings
            let temp = node;
            let leftSiblings = 0;
            while (temp !== -1 && temp !== ancestorNeighbor) {
                leftSiblings += 1;
                temp = tree.leftSibling(temp);
            }
            if (temp !== -1) {
                // Apply portions to appropriate leftsibling subtrees
                const portion = moveDistance / leftSiblings;
                temp = node;
                while (temp === ancestorNeighbor) {
                    const prelim = tree.prelim(temp) + moveDistance;
                    const mod = tree.modifier(temp) + moveDistance;
                    moveDistance = moveDistance - portion;
                    tree.updatePositionValue(temp, { prelim, mod });
                    temp = tree.leftSibling(temp);
                }
            }
            else {
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
    }
}
/**
 *
 * @param tree The tree graph object
 * @param node The node we are starting the walk from
 * @param level refers to the level below the node whose leftmost descendant is being found.
 * This is not the absolute level used in the main walks
 * @param depth The compare depth
 */
function getLeftMost(tree, node, level, depth) {
    if (level >= depth)
        return node;
    else if (tree.isLeaf(node))
        return -1;
    else {
        let rightMost = tree.firstChild(node);
        let leftMost = getLeftMost(tree, rightMost, level + 1, depth);
        // Do a postorder walk of the subtree below Node.
        while (leftMost !== -1 && tree.hasRightSibling(rightMost)) {
            rightMost = tree.rightSibling(rightMost);
            leftMost = getLeftMost(tree, rightMost, level + 1, depth);
        }
        return leftMost;
    }
}
/**
 *
 * @param tree The tree graph object
 * @param node The node we are starting the walk from
 * @param level The current depth
 * @param modSum ???
 */
function secondWalk(tree, node, level, modSum, options) {
    console.log('secondWalk', node, level);
    let result;
    if (level <= options.maxDepth) {
        let xTemp = xTopAdjustment + tree.prelim(node) + modSum;
        let yTemp = yTopAdjustment + level * options.levelSeparation;
        // Check to see that xTemp and yTemp are of the proper *)
        // size for your application.
        if (checkExtendsRange(xTemp, yTemp, options)) {
            tree.updatePositionValue(node, { x: xTemp, y: yTemp });
            if (tree.hasChild(node)) {
                // Apply the modifier value for this node to all its offspring
                result = secondWalk(tree, tree.firstChild(node), level + 1, modSum + tree.modifier(node), options);
                if (result === true && tree.hasRightSibling(node)) {
                    result = secondWalk(tree, tree.rightSibling(node), level + 1, modSum, options);
                }
            }
            else {
                result = true;
            }
        }
        else {
            // Continuing would put the tree outside of the *)
            // drawable extents range.
            result = false;
        }
    }
    else {
        // We are at a level deeper than what we want to draw.
        result = true;
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
function checkExtendsRange(x, y, options) {
    return x >= 0 && x <= options.width && y >= 0 && y <= options.height;
}
