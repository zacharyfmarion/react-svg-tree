"use strict";
/**
 * Class that represents a Tree graph.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class TreeGraph {
    constructor(vertexMap, nodeSizeMap, rootNodePosition) {
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
    createParentMap() {
        const parentMap = new Map();
        this.vertexMap.forEach((children, parent) => {
            if (!children)
                return;
            children.forEach(child => {
                parentMap.set(child, parent);
            });
        });
        return parentMap;
    }
    // Whether or node the tree has a node
    hasNode(node) {
        return this.vertexMap.get(node) !== undefined;
    }
    hasChild(node) {
        const children = this.mapGet(this.vertexMap, node, []);
        return children.length > 0;
    }
    // Return whether the node is a leaf
    isLeaf(node) {
        return this.mapGet(this.vertexMap, node, []).length === 0;
    }
    // Parent of the node
    parent(node) {
        return this.mapGet(this.parentMap, node);
    }
    // Prelim position value of the node
    prelim(node) {
        const pos = this.mapGet(this.positionMap, node, undefined);
        return pos ? pos.prelim : 0;
    }
    // The current node's x-coordinate
    xCoord(node) {
        const pos = this.mapGet(this.positionMap, node, undefined);
        return pos ? pos.x : 0;
    }
    // The current node's y-coordinate
    yCoord(node) {
        const pos = this.mapGet(this.positionMap, node, undefined);
        return pos ? pos.y : 0;
    }
    // The current node's modifier value
    modifier(node) {
        const pos = this.mapGet(this.positionMap, node, undefined);
        return pos ? pos.mod : 0;
    }
    // The current node's leftmost offspring
    firstChild(node) {
        const children = this.mapGet(this.vertexMap, node, []);
        return children.length > 0 ? children[0] : -1;
    }
    // Get the prevNode for a given level
    prevNode(level) {
        return this.mapGet(this.prevNodeMap, level);
    }
    hasLeftSibling(node) {
        return this.leftSibling(node) !== -1;
    }
    hasRightSibling(node) {
        return this.rightSibling(node) !== -1;
    }
    // The current node's closest sibling node on the left.
    leftSibling(node) {
        const siblings = this.getSiblings(node);
        const nodeIndex = siblings.indexOf(node);
        return nodeIndex > 0 ? siblings[nodeIndex - 1] : -1;
    }
    // The current node's closest sibling node on the right
    rightSibling(node) {
        const siblings = this.getSiblings(node);
        const nodeIndex = siblings.indexOf(node);
        return siblings.length - 1 > nodeIndex ? siblings[nodeIndex + 1] : -1;
    }
    // The current node's nearest neighbor to the left, at the same level
    leftNeighbor(node) {
        return this.mapGet(this.leftNeighborMap, node);
    }
    /**
     * -------------------------------------------------------
     * Helper methods
     * -------------------------------------------------------
     */
    // Get siblings of a node
    getSiblings(node) {
        const parent = this.mapGet(this.parentMap, node);
        return this.mapGet(this.vertexMap, parent, []);
    }
    /**
     * Map.get but with a default value
     */
    mapGet(map, key, defaultValue = -1) {
        const ret = map.get(key);
        return ret === undefined ? defaultValue : ret;
    }
    /**
     * Function to update the position map, adding the default
     * values for the position attributes if they do not already
     * exist in the map
     */
    updatePositionValue(key, attributes) {
        this.positionMap.set(key, Object.assign({ x: 0, y: 0, prelim: 0, mod: 0 }, this.positionMap.get(key), attributes));
    }
    /**
     * Return the mean node size of n nodes
     */
    meanNodeSize(nodes) {
        if (!nodes || nodes.length === 0)
            throw new Error('Cannot compute mean of input');
        return (nodes
            .map(node => this.mapGet(this.nodeSizeMap, node, 0))
            .reduce((a, b) => a + b) / nodes.length);
    }
}
exports.default = TreeGraph;
