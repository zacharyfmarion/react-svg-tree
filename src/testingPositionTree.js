"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const positionTree_1 = require("./positionTree");
const TreeGraph_1 = require("./TreeGraph");
const vertexMap = new Map([
    [0, [1, 2, 3]],
    [1, [4, 5, 6]],
    [2, [7, 8]],
    [3, [9]],
    [4, []],
    [5, []],
    [6, []],
    [7, []],
    [8, []],
    [9, []],
]);
const nodeSizeMap = new Map([
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 2],
    [6, 2],
    [7, 2],
    [8, 2],
    [9, 2],
]);
const width = 100;
const rootPosition = [
    0,
    { x: width, y: 0, prelim: 0, mod: 0 },
];
const treeGraph = new TreeGraph_1.default(vertexMap, nodeSizeMap, rootPosition);
const res = positionTree_1.default(treeGraph, rootPosition[0], {
    width,
    height: 100,
    levelSeparation: 2,
    maxDepth: Infinity,
    siblingSeparation: 2,
    subtreeSeparation: 2,
});
console.log(res);
console.log(treeGraph);
