import * as React from 'react';
import { Tree, Node } from './components';

// Component to create a tree, used in docz as a demo of the component
class TreeDemo extends React.Component {
  state = {
    vertexMap: new Map([[0, []]]),
    maxNodeId: 0,
  };

  addNode = (node: any) => {
    let { vertexMap, maxNodeId } = this.state;
    const children = vertexMap.get(node) || [];
    maxNodeId += 1;
    children.push(maxNodeId);
    vertexMap.set(node, children);
    vertexMap.set(maxNodeId, []);
    this.setState({ vertexMap, maxNodeId });
  };

  renderNodes = () => {
    let nodes = [];
    this.state.vertexMap.forEach((children, key) => {
      nodes.push(
        <Node
          id={key}
          childNodes={children}
          onClick={() => this.addNode(key)}
          style={{ cursor: 'pointer' }}
        />,
      );
    });
    return nodes;
  };

  render() {
    return (
      <Tree
        width={200}
        height={75}
        showLabels={true}
        levelSeparation={20}
        siblingSeparation={15}
        subtreeSeparation={15}
        maxDepth={Infinity}
      >
        {this.renderNodes()}
      </Tree>
    );
  }
}

export default TreeDemo;
