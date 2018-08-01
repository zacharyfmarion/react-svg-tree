import positionTree from './positionTree';
import TreeGraph, { Position } from './TreeGraph';

// Compile with the following:
// tsc src/testingPositionTree.ts --target es6 --moduleResolution node -m commonjs

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

const rootPosition: [number, Position] = [
  0,
  { x: width, y: 0, prelim: 0, mod: 0 },
];

const treeGraph = new TreeGraph(vertexMap, nodeSizeMap, rootPosition);
const res = positionTree(treeGraph, rootPosition[0], {
  width,
  height: 100,
  levelSeparation: 2,
  maxDepth: Infinity,
  siblingSeparation: 2,
  subtreeSeparation: 2,
});

console.log(res);
console.log(treeGraph);
