import * as React from 'react';
import { render } from 'react-dom';

import { Tree, Node } from './components/Tree';

function App() {
  return (
    <div className="App">
      <Tree width={100} height={100}>
        {/* Depth === 0 */}
        <Node id={0} depth={0} rowIndex={0} childNodes={[1, 2, 3]} />
        {/* Depth === 1 */}
        <Node id={1} depth={1} rowIndex={0} childNodes={[4, 5, 6]} />
        <Node id={2} depth={1} rowIndex={1} childNodes={[7, 8]} />
        <Node id={3} depth={1} rowIndex={2} childNodes={[9]} />
        {/* Depth === 2 */}
        <Node id={4} depth={2} rowIndex={0} />
        <Node id={5} depth={2} rowIndex={1} />
        <Node id={6} depth={2} rowIndex={2} />
        <Node id={7} depth={2} rowIndex={3} />
        <Node id={8} depth={2} rowIndex={4} />
        <Node id={9} depth={2} rowIndex={5} />
      </Tree>
    </div>
  );
}

render(<App />, document.getElementById('root'));
