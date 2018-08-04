# React Tree

React Tree provides components for rendering tree graphs with svg. You can pass in a map of the vertices to their children:

```js
import { Tree, Node } from 'react-svg-tree';

const vertexMap = new Map([
  ['O', ['E', 'F', 'N']],
  ['E', ['A', 'D']],
  ['F', []],
  ['N', ['G', 'M']],
  ['A', []],
  ['D', ['B', 'C']],
  ['G', []],
  ['M', ['H', 'I', 'J', 'K', 'L']],
  ['B', []],
  ['C', []],
  ['H', []],
  ['I', []],
  ['J', []],
  ['K', []],
  ['L', []],
]);

const App = () => (
  <Tree
    width={200}
    height={150}
    rootId="A"
    vertices={vertexMap}
    showLabels={true}
  />
);
```

You can also pass in a Node components as children, which allows you to modify the size of the nodes:

```js
import { Tree, Node } from 'react-svg-tree';

const App = () => (
  <Tree width={200} height={150} rootId={14} showLabels={true}>
    {/* Depth === 0 */}
    <Node id={14} childNodes={[4, 5, 13]} />
    {/* Depth === 1 */}
    <Node id={4} childNodes={[0, 3]} />
    <Node id={5} childNodes={[6, 12]} />
    <Node id={13} childNodes={[]} />
    {/* Depth === 2 */}
    <Node id={0} childNodes={[]} />
    <Node id={3} childNodes={[1, 2]} />
    <Node id={6} childNodes={[]} />
    <Node id={12} childNodes={[7, 8, 9, 10, 11]} />
    {/* Depth === 3 */}
    <Node id={1} />
    <Node id={2} />
    <Node id={7} />
    <Node id={8} />
    <Node id={9} />
    <Node id={10} />
    <Node id={11} />
  </Tree>
);
```
