import * as React from 'react';
import { render } from 'react-dom';

import { Tree } from './components';

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
  <div className="App">
    <Tree
      width={200}
      height={150}
      rootId="O"
      vertices={vertexMap}
      showLabels={true}
    />
  </div>
);

render(<App />, document.getElementById('root'));
