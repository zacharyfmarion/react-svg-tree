# React SVG Tree

![React svg tree](https://raw.githubusercontent.com/zacharyfmarion/react-svg-tree/master/assets/tree.png)

React Tree provides components for rendering tree graphs with svg. It uses the algorithm described in [this paper](http://www.cs.unc.edu/techreports/89-034.pdf). You can pass in a map of the vertices to render the tree. The component takes a function-as-child which passes in the coordinates and id of the child node, so you can render whatever svg you want.

```js
import { Tree } from 'react-svg-tree';

const vertexMap = new Map([
  [0, [1, 2, 3]],
  [1, [4, 5]],
  [2, []],
  [3, [6]],
  [4, []],
  [5, []],
  [6, []],
]);

const App = () => (
  <Tree width={200} height={75} rootId="O" nodeSize={5} vertices={vertexMap}>
    {({ x, y, id }) => <circle cx={x} cy={y} r={5} />}
  </Tree>
);
```
