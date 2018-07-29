import * as React from 'react';
import { render } from 'react-dom';

import Tree from './components/Tree';
import Node from './components/Node';

function App() {
  return (
    <div className="App">
      <Tree width={200} height={100}>
        <Node id={0} childNodes={[1, 2]} depth={0} />
        <Node id={1} depth={1} />
        <Node id={2} depth={1} />
      </Tree>
    </div>
  );
}

render(<App />, document.getElementById('root'));
